import { Alerts } from "./Alerts";
import { sendMessageToClient } from "./App";
import {  gameSettings, playerData } from "./Global";
import { RandomResultGenerator } from "./SlotDataInit";
import { ScatterPayEntry, BonusPayEntry} from "./utils";
import { bonusGame } from "./BonusResults";
import { specialIcons,bonusGameType } from "./utils";


export class CheckResult {
    clientID: string;
    scatter: string;
    bonus: string;
    useScatter: boolean;
    jackpot: any;
    useJackpot: boolean;
    payTable: PayLines[];
    scatterPayTable: ScatterPayEntry[];
    bonusPaytable: BonusPayEntry[];
    reels: string[][];
    scatterWin: any;
    jackpotWin: any;
    bonusWin: any;
    scatterWinSymbols: any[];
    jackpotWinSymbols: any[];
    winSeq: any;
    winData:WinData;
    bonusResult: string[]

    constructor(clientID: string) {
        this.clientID = clientID;
        console.log("bonus",gameSettings.currentGamedata.bonus);

        if(gameSettings.currentGamedata.bonus.isEnabled && gameSettings.currentGamedata.bonus.type==bonusGameType.tap)
            gameSettings.bonus.game= new bonusGame(gameSettings.currentGamedata.bonus.noOfItem);
        // if(playerData.Balance < gameWining.currentBet)
        if(playerData.Balance < gameSettings.currentBet)
        {
            Alerts(clientID,"Low Balance");
            return;
        }
        console.log("CurrentBet : " +gameSettings.currentBet);
        
        playerData.Balance -= gameSettings.currentBet;


        console.log("player balance:", playerData.Balance);
        console.log("player havewon:", playerData.haveWon);


        gameSettings.lineData = gameSettings.currentGamedata.linesApiData;
        gameSettings.bonus.start=false;
        const rng = new RandomResultGenerator();
        this.makeFullPayTable();

        this.scatter = specialIcons.scatter;
    //     gameSettings.currentGamedata.Symbols?.forEach(element => {
    //         if(element.Name==specialIcons.bonus)
    //         this.bonus=element.Id.toString()
    // });
        this.bonus=specialIcons.bonus;

        this.useScatter = (gameSettings.useScatter && this.scatter !== null);

        this.jackpot = gameSettings.jackpot;
        this.useJackpot = (this.jackpot !== null);
        this.scatterPayTable = gameSettings.scatterPayTable;
        this.bonusPaytable= gameSettings.bonusPayTable;
        this.reels = gameSettings.resultSymbolMatrix;
        this.scatterWin = [];
        this.jackpotWin = [];

        // gameWining.WinningLines = [];
        // gameWining.winningSymbols = [];
        // gameWining.TotalWinningAmount = 0;

        this.scatterWinSymbols = [];
        this.jackpotWinSymbols = [];
        this.winSeq = null;
        this.winData= new WinData();
        this.bonusResult=[];

        this.searchWinSymbols();
    }

    makeFullPayTable() {
        let payTable: PayLines[] = [];
        let payTableFull = [];

        gameSettings.payLine.forEach((pLine) => {
            payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, gameSettings.wildSymbol.SymbolID.toString()))
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
        // gameWining.freeSpins = 0;
        // gameWining.winningSymbols = [];
        // gameWining.WinningLines = [];
        // gameWining.TotalWinningAmount = 0;
        gameSettings.bonus.start=false;
        gameSettings.bonus.stopIndex=-1;

        this.checkForBonus();

        this.checkForWin();

        this.checkForScatter();

        this.checkForJackpot();

        let excludeindex:number[]=[];
        for (let i = 0; i < this.winData.winningSymbols.length; i++) {
            for (let j = i+1; j < this.winData.winningSymbols.length; j++) {
                if(this.winData.winningSymbols[i].some( ai => this.winData.winningSymbols[j].includes(ai) ))
                excludeindex.push(j);
                
            }
            
        }

          let excludeindexModified:number[] = excludeindex.filter((value, index, array) => array.indexOf(value) === index);
          for (let i = excludeindexModified.length - 1; i >= 0; i--){

              this.winData.winningSymbols.splice(excludeindexModified[i], 1);
          }


        this.winData.winningLines=this.winData.winningLines.filter((value, index, array) => array.indexOf(value) === index);
        this.winData.updateBalance();
        console.log("result :",gameSettings.resultSymbolMatrix);
        console.log("win data", this.winData);
        this.makeResultJson();


        // Math.round(num * 100) / 100).toFixed(2)
        console.log("TOTAL WINING : " + this.winData.totalWinningAmount);
        // console.log(gameWining.WinningLines);
        // console.log(gameWining.winningSymbols);
        console.log("_____________RESULT_END________________");
    }

    checkForBonus(){
        let bonuswin=null;
        this.bonusWin=bonuswin;
        if(!gameSettings.currentGamedata.bonus.isEnabled)
            return;

        let bonusSymbols=[]
        let temp=this.findSymbol(this.bonus)
        if (temp.length > 0) bonusSymbols.push(...temp);

        // for (let i = 0; i < gameSettings.resultSymbolMatrix.length; i++) {
        //     for (let j = 0; j < gameSettings.resultSymbolMatrix[i].length; j++) {
        //         if(gameSettings.resultSymbolMatrix[i][j]==this.bonus){
        //             bonusSymbols.push(j.toString()+','+i.toString())
        //         }
        //     }
            
        // }        

        this.bonusPaytable.forEach((element) => {
            if (element.symbolCount > 0 && element.symbolCount == bonusSymbols.length){
                // bonuswin = new WinData(bonusSymbols, 0, 0);
                this.winData.winningSymbols.push(bonusSymbols);
                // this.winData.bonus=true;
                gameSettings.bonus.start=true;

                if(gameSettings.currentGamedata.bonus.type==bonusGameType.tap)
                this.bonusResult=gameSettings.bonus.game.generateData(gameSettings.bonusPayTable[0]?.pay);
    
                gameSettings.bonus.game.setRandomStopIndex();
                this.bonusWin=bonuswin;

            } 
        });

        

    }

    checkForWin(){
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
                    // gameWining.WinningLines.push(index);
                    this.winData.winningLines.push(index);

                    console.log(`Line Index : ${index} : ` + lb + ' - line win: ' + win);
                }
            })
        });
    }

    checkForScatter(){

        this.scatterWinSymbols = [];
        this.scatterWin = null;

        if (this.useScatter) {
            console.log("scattersds",this.scatter);
            let temp = this.findSymbol(this.scatter);
            
            if (temp.length > 0) this.scatterWinSymbols.push(...temp);
            // this.reels.forEach((reel) => {
            // });
           
            this.scatterPayTable.forEach((sPL) => {
                if (sPL.symbolCount > 0 && sPL.symbolCount == this.scatterWinSymbols.length){
                    // this.scatterWin = new WinData(this.scatterWinSymbols, sPL.freeSpins, sPL.pay);
                    
                    this.winData.winningSymbols.push(this.scatterWinSymbols);
                    this.winData.freeSpins+=sPL.freeSpins;
                    this.winData.totalWinningAmount+=sPL.pay;
                } 
            });

            // if (this.scatterWin == null) this.scatterWinSymbols = [];
            
        }

    }

    checkForJackpot(){
        this.jackpotWinSymbols = [];
        this.jackpotWin = [];

        if (this.useJackpot) {
            var temp = this.findSymbol(this.jackpot.symbolName);
            if (temp.length > 0) this.jackpotWinSymbols.push(...temp);
            // this.reels.forEach((reel) => {
            // });
            
            console.log('find Jackpot symbols: ' + this.jackpotWinSymbols);

            if (this.jackpot.symbolsCount > 0 && this.jackpot.symbolsCount == this.jackpotWinSymbols.length) {
                // this.jackpotWin = new WinData(this.jackpotWinSymbols, 0, this.jackpot.defaultAmount);
                // playerData.Balance += (this.jackpotWin.pay);
                // playerData.haveWon += (this.jackpotWin.pay);

                this.winData.winningSymbols.push(this.jackpotWinSymbols);
                this.winData.totalWinningAmount+=this.jackpot.defaultAmount;
            }
            
        }
    }



    getPayLineWin(payLine: PayLines, lineData: any) {

        if (payLine == null) return null;
        let winSymbols = [];
        for (let i = 0; i < lineData.length; i++) {
            
            const symbol = this.getSymbolOnMatrix(i);

            const s = symbol[lineData[i]];
            
            if (payLine.line[i] !== specialIcons.any && s !== payLine.line[i]) {
                return;
            }
            else if (payLine.line[i] !== specialIcons.any && s === payLine.line[i]) {
                const symbolIndex =  i.toString() + ',' + lineData[i].toString() ;
                winSymbols.push(symbolIndex);
            }
        }


        if(!payLine.pay)payLine.pay = 0;

        this.winData.winningSymbols.push(winSymbols);
        this.winData.freeSpins+=payLine.freeSpins;
        this.winData.totalWinningAmount+=payLine.pay

        // const winData=new WinData(winSymbols, payLine.freeSpins, payLine.pay);


        return {freeSpins: payLine.freeSpins, pay: payLine.pay};
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

        gameSettings.currentGamedata.Symbols.forEach(element => {
            if (SymbolName == element.Name)
                symbolId = element.Id;
        });

        // for (let i = 0; i < gameSettings.matrix.y; i++) {
        //     for (let j = 0; j < gameSettings.matrix.x; j++) {
        //         if (gameSettings.resultSymbolMatrix[i][j] == symbolId.toString())
        //             foundArray.push(symbolId.toString());
        //     }
        // }
        for (let i = 0; i < gameSettings.resultSymbolMatrix.length; i++) {
            for (let j = 0; j < gameSettings.resultSymbolMatrix[i].length; j++) {
                if(gameSettings.resultSymbolMatrix[i][j] == symbolId.toString())
                    foundArray.push(j.toString()+','+i.toString());
                
            }
            
        }
        return foundArray;
    }

    makeResultJson() {
        this.winData.totalWinningAmount = (Math.round(this.winData.totalWinningAmount * 100) / 100)
        console.log("bonus type",gameSettings.currentGamedata.bonus.type);
        const ResultData = {
            "GameData":{
                ResultReel: gameSettings.resultSymbolMatrix,
                linesToEmit: this.winData.winningLines,
                // linesToEmit: gameWining.WinningLines,
                symbolsToEmit: this.winData.winningSymbols,
                // symbolsToEmit: gameWining.winningSymbols,
                WinAmout: this.winData.totalWinningAmount ,
                // WinAmout: gameWining.TotalWinningAmount,
                freeSpins: this.winData.freeSpins,
                // freeSpins: gameWining.freeSpins,
                jackpot : this.jackpotWin.pay,
                isBonus :gameSettings.bonus.start,
                BonusStopIndex : gameSettings.bonus.stopIndex,
                BonusResult:  this.bonusResult,

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
        gameSettings.currentGamedata.Symbols.forEach((name) => {
            const data = { name: name.Name, Id: name.Id, useWildSub: name.useWildSub }
            symbolsDict.push(data)
        });

        for (let i = 0; i < this.line.length; i++) {
            let sName = this.line[i];
            if (sName !== specialIcons.any && sName !== this.wild) {
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
    // symbols: any[];
    freeSpins: number;
    // pay: number = 0;
    // bonus: boolean;
    winningSymbols: any[];
    winningLines: any[];
    totalWinningAmount: number =0;
    // shouldFreeSpin: boolean;
    // currentBet: 0;

    constructor( ) {
        // this.symbols = symbols;
        this.freeSpins = 0;
        // this.pay = pay;
        // this.bonus=bonus;
        
        // gameWining.winningSymbols.push(symbols);
        // if (freeSpins > 0)
        // this.shouldFreeSpin = true;
        // else
        // this.shouldFreeSpin = false;

        this.winningLines=[];
        this.winningSymbols=[];
    }
    // constructor( freeSpins: number, pay: number) {
    //     // this.symbols = symbols;
    //     this.freeSpins = freeSpins;
    //     // this.pay = pay;
    //     // this.bonus=bonus;
        
    //     // gameWining.winningSymbols.push(symbols);
    //     if (freeSpins > 0)
    //     this.shouldFreeSpin = true;
    //     else
    //     this.shouldFreeSpin = false;

    //     this.winningLines=[];
    //     this.winningSymbols=[];
    // }

    // symbolsToString(): string {
    //     if (this.symbols == null) return "";
    //     let ss = "";
    //     this.symbols.forEach((item) => { ss += (item !== null && item !== null) ? item : "?"; });
    //     return ss;
    // }

    // toString(): string {
    //     console.log(`pay : ${this.pay}  current Bet : ${gameSettings.currentBet}`);
    //     this.updateBalance();
    //     return this.symbolsToString() + '\n' + 'Pay: ' + this.pay + '; FreeSpin: ' + this.freeSpins;
    // }
    updateBalance()
    {
        // gameWining.TotalWinningAmount += this.pay;
        playerData.Balance += this.totalWinningAmount;
        playerData.haveWon += this.totalWinningAmount;
        // gameWining.freeSpins = gameWining.freeSpins+this.freeSpins;
    }
}
