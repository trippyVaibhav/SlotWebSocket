import { log } from "console";
import { Alerts } from "./Alerts";
import { sendMessageToClient } from "./App";
import {  gameSettings, gameWining, playerData } from "./Global";
import { RandomResultGenerator } from "./SlotDataInit";
import { linesApiData, Symbols } from "./testData";
import { ScatterPayEntry} from "./utils";
import { bonusGame } from "./BonusResults";
export class CheckResult {
    clientID: string;
    scatter: string;
    useScatter: boolean;
    jackpot: any;
    useJackpot: boolean;
    payTable: PayLines[];
    scatterPayTable: ScatterPayEntry[];
    reels: string[][];
    scatterWin: any;
    jackpotWin: any;
    scatterWinSymbols: any[];
    jackpotWinSymbols: any[];
    winSeq: any;
    bonus:boolean;

    constructor(clientID: string) {
        
        if(playerData.Balance < gameWining.currentBet)
        {
            Alerts(clientID,"Low Balance");
            return;
        }
        console.log("CurrentBet : " +gameWining.currentBet);
        
        playerData.Balance -= gameWining.currentBet;
        //playerData.haveWon -= gameWining.currentBet;
        
        this.clientID = clientID;
        gameSettings.lineData = linesApiData;
        const rng = new RandomResultGenerator();
        this.makeFullPayTable();

        this.scatter = 'scatter';
        this.useScatter = (gameSettings.useScatter && this.scatter !== null);
        this.jackpot = gameSettings.jackpot;
        this.useJackpot = (this.jackpot !== null);
        this.scatterPayTable = gameSettings.scatterPayTable;
        this.reels = gameSettings.resultSymbolMatrix;
        this.scatterWin = [];
        this.jackpotWin = [];
        gameWining.WinningLines = [];
        gameWining.winningSymbols = [];
        gameWining.TotalWinningAmount = 0;
        this.scatterWinSymbols = [];
        this.jackpotWinSymbols = [];
        this.winSeq = null;
  
        this.searchWinSymbols();
    }

    makeFullPayTable() {
        let payTable: PayLines[] = [];
        let payTableFull = [];

        gameSettings.payLine.forEach((pLine) => {
            payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, gameSettings.wildSymbol.SymbolName))
        })

        for (let j = 0; j < payTable.length; j++) {
            payTableFull.push(payTable[j]);
            let wildLines = payTable[j].getWildLines();
            if (gameSettings.useWild) wildLines.forEach((wl) => { payTableFull.push(wl); });
        }
        gameSettings.fullPayTable = payTableFull;
    }

    searchWinSymbols() {
        console.log('search win symbols');

        gameWining.winningSymbols = [];
        gameWining.WinningLines = [];
        gameWining.TotalWinningAmount = 0;
        gameSettings.lineData.forEach((lb,index) => {

            let win = null;
            gameSettings.fullPayTable.forEach((Payline: PayLines) => {
                //  find max win (or win with max symbols count)
                const winTemp = this.getPayLineWin(Payline, lb);
                if (winTemp != null) {
                    if (win == null) 
                    win = winTemp;
                    else {
                        if (win.Pay < winTemp.pay || win.FreeSpins < winTemp.freeSpins) 
                        win = winTemp;
                    }
                    gameWining.WinningLines.push(index);
                    console.log(`Line Index : ${index} : ` + lb + ' - line win: ' + win);
                }
            })
        });

        // search scatters
        this.scatterWinSymbols = [];
        this.scatterWin = null;

        if (this.useScatter) {
            // console.log("USED SCATTER");
            
            this.reels.forEach((reel) => {
                let temp = this.findSymbol(this.scatter);
                // console.log("SCATTER TEMP " + temp);
                
                if (temp.length > 0) this.scatterWinSymbols.push(...temp);


            });

            this.scatterPayTable.forEach((sPL) => {
                console.log(sPL);
                if (sPL.symbolCount > 0 && sPL.symbolCount == this.scatterWinSymbols.length) 
                this.scatterWin = new WinData(this.scatterWinSymbols, sPL.freeSpins, sPL.pay);
            });
            // console.log(`SCATTER SYMBOL :  ${this.scatterWinSymbols}`);
            if (this.scatterWin == null) this.scatterWinSymbols = [];
            
        }
        this.jackpotWinSymbols = [];
        this.jackpotWin = [];

        console.log('use Jackpot: ' + this.useJackpot);
        if (this.useJackpot) {
            this.reels.forEach((reel) => {
                var temp = this.findSymbol(gameSettings.jackpot.symbolName);
                if (temp.length > 0) this.jackpotWinSymbols.push(...temp);
            });
            console.log('find Jackpot symbols: ' + this.jackpotWinSymbols);
            if (this.jackpot.symbolsCount > 0 && this.jackpot.symbolsCount == this.jackpotWinSymbols.length) {
                this.jackpotWin = new WinData(this.jackpotWinSymbols, 0, gameSettings.jackpot.defaultAmount);
                playerData.Balance += this.jackpotWin.pay;
                playerData.haveWon += this.jackpotWin.pay;
            }
            
        }
        console.log("result :",gameSettings.resultSymbolMatrix);
        if(gameWining.freeSpins > 0)gameWining.freeSpins -=1;
        this.makeResultJson();

        
        console.log("TOTAL WINING : " + gameWining.TotalWinningAmount);
        console.log(gameWining.WinningLines);
        console.log(gameWining.winningSymbols);
        console.log("_____________RESULT_END________________");
    }

    getPayLineWin(payLine: PayLines, lineData: any) {
        if (payLine == null) return null;
        let winSymbols = [];
        for (let i = 0; i < lineData.length; i++) {
            
            const symbol = this.getSymbolOnMatrix(i);
            const s = symbol[lineData[i]];
            
            if (payLine.line[i] !== 'any' && s !== payLine.line[i]) {
                return;
            }
            else if (payLine.line[i] !== 'any' && s === payLine.line[i]) {
                const symbolIndex =  i.toString() + ',' + lineData[i].toString() ;
                winSymbols.push(symbolIndex);
            }
        }
        if(!payLine.pay)payLine.pay = 0;
        return new WinData(winSymbols, payLine.freeSpins, payLine.pay);
    }


    getSymbolOnMatrix(index: number) {
        let symbolsOnGrid = [];
        for (let i = 0; i < gameSettings.matrix.y; i++) {
            const symbol = gameSettings.resultSymbolMatrix[i][index]
            symbolsOnGrid.push(symbol);
        }
        return symbolsOnGrid;
    }

    getIndexForResult(index: number) {
        for (let i = 0; i < gameSettings.matrix.y; i++) {
            let symbolIndex = index.toString() + ',' + i.toString() ;
            return symbolIndex;
        }
    }

    findSymbol(SymbolName: string) {
        let symbolId: number = -1;
        let foundArray = [];

        Symbols.forEach(element => {
            if (SymbolName == element.Name)
                symbolId = element.Id;
        });

        for (let i = 0; i < gameSettings.matrix.y; i++) {
            for (let j = 0; j < gameSettings.matrix.x; j++) {
                if (gameSettings.resultSymbolMatrix[i][j] == symbolId.toString())
                    foundArray.push(symbolId.toString());
            }
        }
        return foundArray;
    }

    makeResultJson() {

        const ResultData = {
            "GameData":{
                ResultReel: gameSettings.resultSymbolMatrix,
                linesToEmit: gameWining.WinningLines,
                symbolsToEmit: gameWining.winningSymbols,
                WinAmout: gameWining.TotalWinningAmount,
                freeSpins: gameWining.freeSpins,
                jackpot : this.jackpotWin.pay,
                isBonus : gameSettings.bonus.start,
                BonusStopIndex : gameSettings.bonus.stopIndex,

            },
            "PlayerData" : playerData,
        }
        sendMessageToClient(this.clientID, "ResultData", ResultData);
    }

    // return symbols from windows
    getWindowsSymbols(reel: number) {
        let vSymbols = [];
        for (let si = 0; si < gameSettings.matrix.y; si++) {
            const order = si;
            vSymbols.push(gameSettings.resultSymbolMatrix[reel]);
        }
        return vSymbols;
    }
}

// Helper class to make combinations
class ComboCounter {
    maxCounterValues: any;
    combo: any[];
    firstCombo: boolean;
    constructor(maxCounterValues) // positions [max Val0, max Val1, max Val2, ...]
    {
        this.maxCounterValues = maxCounterValues;
        this.combo = [];
        this.maxCounterValues.forEach((p) => { this.combo.push(0);});
        this.firstCombo = true;
    }

    nextCombo() {
        if (this.firstCombo) {
            this.firstCombo = false;
            return true;
        }
        for (let i = this.maxCounterValues.length - 1; i >= 0; i--) {
            if (this.combo[i] < this.maxCounterValues[i]) {
                this.combo[i]++;
                if (i != this.maxCounterValues.length - 1) // reset low "bits"
                {
                    for (var j = i + 1; j < this.maxCounterValues.length; j++) {
                        this.combo[j] = 0;
                    }
                }
                return true;
            }
        }
        return false;
    }

    sum() {
        let s = 0;
        this.combo.forEach((ci) => { s += ci; });
        return s;
    }

    getComboCounts() {
        let counts = 1;
        this.maxCounterValues.forEach((p) => {
            if (p != 0) counts *= p;
        });
    }
}


class PayLines {
    wild: any;
    useWildInFirstPosition: boolean;
    useWild: any;
    symbolsDict: any;
    line: any;
    pay: any;
    freeSpins: any;
    constructor(line, pay, freeSpins, wild) {

        this.line = line;
        this.pay = pay;
        this.freeSpins = freeSpins;
        this.useWildInFirstPosition = false;
        this.wild = wild;
    }

    getWildLines() {
        let res: PayLines[] = [];
        if (!gameSettings.useWild) return res; // return empty list

        let wPoss = this.getPositionsForWild();

        const maxWildsCount = (this.useWildInFirstPosition) ? wPoss.length - 1 : wPoss.length;
        let minWildsCount = 1;
        let maxCounterValues: any[] = [];
        wPoss.forEach((p) => { maxCounterValues.push(1); });

        let cC = new ComboCounter(maxCounterValues);
        while (cC.nextCombo()) {

            let combo = cC.combo;
            let comboSum = cC.sum();     // count of wilds in combo

            if ((comboSum >= minWildsCount) && (comboSum <= maxWildsCount)) {
                let p = new PayLines(Array.from(this.line), this.pay, this.freeSpins, this.wild);
                for (let i = 0; i < wPoss.length; i++) {
                    let pos = wPoss[i];
                    if (combo[i] == 1) {
                        p.line[pos] = this.wild;
                    }
                }
                if (!this.isEqual(p) && !this.containEqualLine(res, p)) res.push(p);
            }
        }
        return res;
    }

    getPositionsForWild() {
        let wPoss: any[] = [];
        let counter = 0;
        let symbolsDict: any[] = [];
        Symbols.forEach((name) => {
            const data = { name: name.Name, Id: name.Id, useWildSub: name.useWildSub }
            symbolsDict.push(data)
        });

        for (let i = 0; i < this.line.length; i++) {
            let sName = this.line[i];
            if (sName !== 'any' && sName !== this.wild) {
                if (!this.useWildInFirstPosition && counter == 0) // don't use first
                {
                    counter++;
                }
                else {
                    if (symbolsDict[sName].useWildSub) wPoss.push(i);
                    counter++;
                }
            }
        }
        return wPoss;
    }

    isEqual(pLine) {
        if (pLine === null) return false;
        if (pLine.line === null) return false;
        if (this.line.length != pLine.line.length) return false;
        for (let i = 0; i < this.line.length; i++) {
            if (this.line[i] !== pLine.line[i]) return false;
        }
        return true;
    }

    containEqualLine(pList, pLine) {
        if (pList == null) return false;
        if (pLine == null) return false;
        if (pLine.line == null) return false;
        for (let i = 0; i < pList.length; i++) {
            if (pList[i].isEqual(pLine)) return true;
        }
        return false;
    }
}

class WinData {
    symbols: any[];
    freeSpins: number;
    pay: number = 0;

    constructor(symbols: any[], freeSpins: number, pay: number) {
        this.symbols = symbols;
        this.freeSpins = freeSpins;
        this.pay = pay;
        gameWining.winningSymbols.push(symbols);

        if (freeSpins > 0)
        gameWining.shouldFreeSpin = true;
        else
        gameWining.shouldFreeSpin = false;
    }

    symbolsToString(): string {
        if (this.symbols == null) return "";
        let ss = "";
        this.symbols.forEach((item) => { ss += (item !== null && item !== null) ? item : "?"; });
        return ss;
    }

    toString(): string {
        console.log(`pay : ${this.pay}  current Bet : ${gameWining.currentBet}`);
        this.updateBalance();
        return this.symbolsToString() + '\n' + 'Pay: ' + this.pay + '; FreeSpin: ' + this.freeSpins;
    }
    updateBalance()
    {
        gameWining.TotalWinningAmount += this.pay;
        playerData.Balance += this.pay;
        playerData.haveWon += this.pay;
        gameWining.freeSpins = gameWining.freeSpins+this.freeSpins;
    }
}
