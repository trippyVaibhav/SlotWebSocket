"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckResult = void 0;
var Alerts_1 = require("./Alerts");
var App_1 = require("./App");
var Global_1 = require("./Global");
var SlotDataInit_1 = require("./SlotDataInit");
var BonusResults_1 = require("./BonusResults");
var CheckResult = /** @class */ (function () {
    function CheckResult(clientID) {
        if (Global_1.gameSettings.currentGamedata.bonus.isEnabled && Global_1.gameSettings.currentGamedata.bonus.type == "tap")
            Global_1.gameSettings.bonus.game = new BonusResults_1.bonusGame(3);
        // if(playerData.Balance < gameWining.currentBet)
        if (Global_1.playerData.Balance < Global_1.gameSettings.currentBet) {
            (0, Alerts_1.Alerts)(clientID, "Low Balance");
            return;
        }
        console.log("CurrentBet : " + Global_1.gameSettings.currentBet);
        // console.log("CurrentBet : " +gameWining.currentBet);
        Global_1.playerData.Balance -= Global_1.gameSettings.currentBet;
        // playerData.Balance -= gameWining.currentBet;
        // playerData.haveUsed+=gameWining.currentBet;
        console.log("player balance:", Global_1.playerData.Balance);
        console.log("player havewon:", Global_1.playerData.haveWon);
        // console.log("player haveused:", playerData.haveUsed);
        // conrtolWeights(playerData.haveWon,playerData.haveUsed);
        this.clientID = clientID;
        Global_1.gameSettings.lineData = Global_1.gameSettings.currentGamedata.linesApiData;
        var rng = new SlotDataInit_1.RandomResultGenerator();
        this.makeFullPayTable();
        this.scatter = 'scatter';
        this.bonus = 'Bonus';
        this.useScatter = (Global_1.gameSettings.useScatter && this.scatter !== null);
        this.jackpot = Global_1.gameSettings.jackpot;
        this.useJackpot = (this.jackpot !== null);
        this.scatterPayTable = Global_1.gameSettings.scatterPayTable;
        this.bonusPaytable = Global_1.gameSettings.bonusPayTable;
        this.reels = Global_1.gameSettings.resultSymbolMatrix;
        this.scatterWin = [];
        this.jackpotWin = [];
        Global_1.gameWining.WinningLines = [];
        Global_1.gameWining.winningSymbols = [];
        Global_1.gameWining.TotalWinningAmount = 0;
        this.scatterWinSymbols = [];
        this.jackpotWinSymbols = [];
        this.winSeq = null;
        this.winData = new WinData([], 0, 0);
        this.bonusResult = [];
        this.searchWinSymbols();
    }
    CheckResult.prototype.makeFullPayTable = function () {
        var payTable = [];
        var payTableFull = [];
        Global_1.gameSettings.payLine.forEach(function (pLine) {
            payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, Global_1.gameSettings.wildSymbol.SymbolName));
        });
        for (var j = 0; j < payTable.length; j++) {
            payTableFull.push(payTable[j]);
            var wildLines = payTable[j].getWildLines();
            if (Global_1.gameSettings.useWild)
                wildLines.forEach(function (wl) { payTableFull.push(wl); });
        }
        Global_1.gameSettings.fullPayTable = payTableFull;
    };
    CheckResult.prototype.searchWinSymbols = function () {
        console.log('search win symbols');
        Global_1.gameWining.freeSpins = 0;
        Global_1.gameWining.winningSymbols = [];
        Global_1.gameWining.WinningLines = [];
        Global_1.gameWining.TotalWinningAmount = 0;
        Global_1.gameSettings.bonus.start = false;
        Global_1.gameSettings.bonus.stopIndex = -1;
        this.checkForBonus();
        this.checkForWin();
        this.checkForScatter();
        this.checkForJackpot();
        console.log("result :", Global_1.gameSettings.resultSymbolMatrix);
        console.log("win data", Global_1.gameWining);
        this.makeResultJson();
        console.log("TOTAL WINING : " + Global_1.gameWining.TotalWinningAmount);
        // console.log(gameWining.WinningLines);
        // console.log(gameWining.winningSymbols);
        console.log("_____________RESULT_END________________");
    };
    CheckResult.prototype.checkForBonus = function () {
        var _this = this;
        var _a;
        var bonuswin = null;
        this.bonusWin = bonuswin;
        if (!Global_1.gameSettings.currentGamedata.bonus.isEnabled)
            return;
        var bonusSymbols = [];
        var temp = this.findSymbol(this.bonus);
        if (temp.length > 0)
            bonusSymbols.push.apply(bonusSymbols, temp);
        this.bonusPaytable.forEach(function (element) {
            if (element.symbolCount > 0 && element.symbolCount == bonusSymbols.length) {
                bonuswin = new WinData(bonusSymbols, 0, 0);
                _this.winData.bonus = true;
            }
        });
        if (bonuswin) {
            Global_1.gameSettings.bonus.start = true;
            if (Global_1.gameSettings.currentGamedata.bonus.type == "tap")
                this.bonusResult = Global_1.gameSettings.bonus.game.generateData((_a = Global_1.gameSettings.bonusPayTable[0]) === null || _a === void 0 ? void 0 : _a.pay);
            Global_1.gameSettings.bonus.game.setRandomStopIndex();
            this.bonusWin = bonuswin;
        }
    };
    CheckResult.prototype.checkForWin = function () {
        var _this = this;
        Global_1.gameSettings.lineData.forEach(function (lb, index) {
            var win = null;
            Global_1.gameSettings.fullPayTable.forEach(function (Payline) {
                //  find max win (or win with max symbols count)
                var winTemp = _this.getPayLineWin(Payline, lb);
                if (winTemp != null) {
                    if (win == null)
                        win = winTemp;
                    else {
                        if (win.Pay < winTemp.pay || win.FreeSpins < winTemp.freeSpins)
                            win = winTemp;
                    }
                    Global_1.gameWining.WinningLines.push(index);
                    _this.winData.winningLines.push(index);
                    console.log("Line Index : ".concat(index, " : ") + lb + ' - line win: ' + win);
                }
            });
        });
    };
    CheckResult.prototype.checkForScatter = function () {
        var _a;
        var _this = this;
        this.scatterWinSymbols = [];
        this.scatterWin = null;
        if (this.useScatter) {
            var temp = this.findSymbol(this.scatter);
            if (temp.length > 0)
                (_a = this.scatterWinSymbols).push.apply(_a, temp);
            // this.reels.forEach((reel) => {
            // });
            this.scatterPayTable.forEach(function (sPL) {
                if (sPL.symbolCount > 0 && sPL.symbolCount == _this.scatterWinSymbols.length) {
                    _this.scatterWin = new WinData(_this.scatterWinSymbols, sPL.freeSpins, sPL.pay);
                    _this.winData.winningSymbols.push(_this.scatterWinSymbols);
                    _this.winData.freeSpins += sPL.freeSpins;
                    _this.winData.totalWinningAmount += sPL.pay;
                }
            });
            // console.log(`SCATTER SYMBOL :  ${this.scatterWinSymbols}`);
            if (this.scatterWin == null)
                this.scatterWinSymbols = [];
        }
    };
    CheckResult.prototype.checkForJackpot = function () {
        var _this = this;
        this.jackpotWinSymbols = [];
        this.jackpotWin = [];
        console.log('use Jackpot: ' + this.useJackpot);
        if (this.useJackpot) {
            this.reels.forEach(function (reel) {
                var _a;
                var temp = _this.findSymbol(Global_1.gameSettings.jackpot.symbolName);
                if (temp.length > 0)
                    (_a = _this.jackpotWinSymbols).push.apply(_a, temp);
            });
            console.log('find Jackpot symbols: ' + this.jackpotWinSymbols);
            if (this.jackpot.symbolsCount > 0 && this.jackpot.symbolsCount == this.jackpotWinSymbols.length) {
                this.jackpotWin = new WinData(this.jackpotWinSymbols, 0, Global_1.gameSettings.jackpot.defaultAmount);
                Global_1.playerData.Balance += (this.jackpotWin.pay);
                Global_1.playerData.haveWon += (this.jackpotWin.pay);
                this.winData.winningSymbols.push(this.jackpotWinSymbols);
                this.winData.totalWinningAmount += this.jackpotWin.pay;
            }
        }
    };
    CheckResult.prototype.getPayLineWin = function (payLine, lineData) {
        if (payLine == null)
            return null;
        var winSymbols = [];
        for (var i = 0; i < lineData.length; i++) {
            var symbol = this.getSymbolOnMatrix(i);
            var s = symbol[lineData[i]];
            if (payLine.line[i] !== 'any' && s !== payLine.line[i]) {
                return;
            }
            else if (payLine.line[i] !== 'any' && s === payLine.line[i]) {
                var symbolIndex = i.toString() + ',' + lineData[i].toString();
                winSymbols.push(symbolIndex);
            }
        }
        if (!payLine.pay)
            payLine.pay = 0;
        // this.winData.winningLines.push(index);
        this.winData.winningSymbols.push(winSymbols);
        this.winData.freeSpins += payLine.freeSpins;
        this.winData.totalWinningAmount += payLine.pay;
        var winData = new WinData(winSymbols, payLine.freeSpins, payLine.pay);
        return winData;
    };
    CheckResult.prototype.getSymbolOnMatrix = function (index) {
        var symbolsOnGrid = [];
        for (var i = 0; i < Global_1.gameSettings.matrix.y; i++) {
            var symbol = Global_1.gameSettings.resultSymbolMatrix[i][index];
            symbolsOnGrid.push(symbol);
        }
        return symbolsOnGrid;
    };
    CheckResult.prototype.getIndexForResult = function (index) {
        for (var i = 0; i < Global_1.gameSettings.matrix.y; i++) {
            var symbolIndex = index.toString() + ',' + i.toString();
            return symbolIndex;
        }
    };
    CheckResult.prototype.findSymbol = function (SymbolName) {
        var symbolId = -1;
        var foundArray = [];
        Global_1.gameSettings.currentGamedata.Symbols.forEach(function (element) {
            if (SymbolName == element.Name)
                symbolId = element.Id;
        });
        for (var i = 0; i < Global_1.gameSettings.matrix.y; i++) {
            for (var j = 0; j < Global_1.gameSettings.matrix.x; j++) {
                if (Global_1.gameSettings.resultSymbolMatrix[i][j] == symbolId.toString())
                    foundArray.push(symbolId.toString());
            }
        }
        return foundArray;
    };
    CheckResult.prototype.makeResultJson = function () {
        console.log("bonus type", Global_1.gameSettings.currentGamedata.bonus.type);
        var ResultData = {
            "GameData": {
                ResultReel: Global_1.gameSettings.resultSymbolMatrix,
                linesToEmit: this.winData.winningLines,
                // linesToEmit: gameWining.WinningLines,
                symbolsToEmit: this.winData.winningSymbols,
                // symbolsToEmit: gameWining.winningSymbols,
                WinAmout: this.winData.totalWinningAmount,
                // WinAmout: gameWining.TotalWinningAmount,
                freeSpins: this.winData.freeSpins,
                // freeSpins: gameWining.freeSpins,
                jackpot: this.jackpotWin.pay,
                isBonus: Global_1.gameSettings.bonus.start,
                BonusStopIndex: Global_1.gameSettings.bonus.stopIndex,
                BonusResult: this.bonusResult,
            },
            "PlayerData": Global_1.playerData,
        };
        (0, App_1.sendMessageToClient)(this.clientID, "ResultData", ResultData);
    };
    // return symbols from windows
    CheckResult.prototype.getWindowsSymbols = function (reel) {
        var vSymbols = [];
        for (var si = 0; si < Global_1.gameSettings.matrix.y; si++) {
            var order = si;
            vSymbols.push(Global_1.gameSettings.resultSymbolMatrix[reel]);
        }
        return vSymbols;
    };
    return CheckResult;
}());
exports.CheckResult = CheckResult;
// Helper class to make combinations
var ComboCounter = /** @class */ (function () {
    function ComboCounter(maxCounterValues) {
        var _this = this;
        this.maxCounterValues = maxCounterValues;
        this.combo = [];
        this.maxCounterValues.forEach(function (p) { _this.combo.push(0); });
        this.firstCombo = true;
    }
    ComboCounter.prototype.nextCombo = function () {
        if (this.firstCombo) {
            this.firstCombo = false;
            return true;
        }
        for (var i = this.maxCounterValues.length - 1; i >= 0; i--) {
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
    };
    ComboCounter.prototype.sum = function () {
        var s = 0;
        this.combo.forEach(function (ci) { s += ci; });
        return s;
    };
    ComboCounter.prototype.getComboCounts = function () {
        var counts = 1;
        this.maxCounterValues.forEach(function (p) {
            if (p != 0)
                counts *= p;
        });
    };
    return ComboCounter;
}());
var PayLines = /** @class */ (function () {
    function PayLines(line, pay, freeSpins, wild) {
        this.line = line;
        this.pay = pay;
        this.freeSpins = freeSpins;
        this.useWildInFirstPosition = false;
        this.wild = wild;
    }
    PayLines.prototype.getWildLines = function () {
        var res = [];
        if (!Global_1.gameSettings.useWild)
            return res; // return empty list
        var wPoss = this.getPositionsForWild();
        var maxWildsCount = (this.useWildInFirstPosition) ? wPoss.length - 1 : wPoss.length;
        var minWildsCount = 1;
        var maxCounterValues = [];
        wPoss.forEach(function (p) { maxCounterValues.push(1); });
        var cC = new ComboCounter(maxCounterValues);
        while (cC.nextCombo()) {
            var combo = cC.combo;
            var comboSum = cC.sum(); // count of wilds in combo
            if ((comboSum >= minWildsCount) && (comboSum <= maxWildsCount)) {
                var p = new PayLines(Array.from(this.line), this.pay, this.freeSpins, this.wild);
                for (var i = 0; i < wPoss.length; i++) {
                    var pos = wPoss[i];
                    if (combo[i] == 1) {
                        p.line[pos] = this.wild;
                    }
                }
                if (!this.isEqual(p) && !this.containEqualLine(res, p))
                    res.push(p);
            }
        }
        return res;
    };
    PayLines.prototype.getPositionsForWild = function () {
        var wPoss = [];
        var counter = 0;
        var symbolsDict = [];
        Global_1.gameSettings.currentGamedata.Symbols.forEach(function (name) {
            var data = { name: name.Name, Id: name.Id, useWildSub: name.useWildSub };
            symbolsDict.push(data);
        });
        for (var i = 0; i < this.line.length; i++) {
            var sName = this.line[i];
            if (sName !== 'any' && sName !== this.wild) {
                if (!this.useWildInFirstPosition && counter == 0) // don't use first
                 {
                    counter++;
                }
                else {
                    if (symbolsDict[sName].useWildSub)
                        wPoss.push(i);
                    counter++;
                }
            }
        }
        return wPoss;
    };
    PayLines.prototype.isEqual = function (pLine) {
        if (pLine === null)
            return false;
        if (pLine.line === null)
            return false;
        if (this.line.length != pLine.line.length)
            return false;
        for (var i = 0; i < this.line.length; i++) {
            if (this.line[i] !== pLine.line[i])
                return false;
        }
        return true;
    };
    PayLines.prototype.containEqualLine = function (pList, pLine) {
        if (pList == null)
            return false;
        if (pLine == null)
            return false;
        if (pLine.line == null)
            return false;
        for (var i = 0; i < pList.length; i++) {
            if (pList[i].isEqual(pLine))
                return true;
        }
        return false;
    };
    return PayLines;
}());
var WinData = /** @class */ (function () {
    function WinData(symbols, freeSpins, pay, bonus) {
        if (bonus === void 0) { bonus = false; }
        this.pay = 0;
        this.totalWinningAmount = 0;
        this.symbols = symbols;
        this.freeSpins = freeSpins;
        this.pay = pay;
        this.bonus = bonus;
        Global_1.gameWining.winningSymbols.push(symbols);
        if (freeSpins > 0)
            this.shouldFreeSpin = true;
        else
            this.shouldFreeSpin = false;
        this.winningLines = [];
        this.winningSymbols = [];
    }
    WinData.prototype.symbolsToString = function () {
        if (this.symbols == null)
            return "";
        var ss = "";
        this.symbols.forEach(function (item) { ss += (item !== null && item !== null) ? item : "?"; });
        return ss;
    };
    WinData.prototype.toString = function () {
        console.log("pay : ".concat(this.pay, "  current Bet : ").concat(Global_1.gameWining.currentBet));
        this.updateBalance();
        return this.symbolsToString() + '\n' + 'Pay: ' + this.pay + '; FreeSpin: ' + this.freeSpins;
    };
    WinData.prototype.updateBalance = function () {
        Global_1.gameWining.TotalWinningAmount += this.pay;
        Global_1.playerData.Balance += this.pay;
        Global_1.playerData.haveWon += this.pay;
        Global_1.gameWining.freeSpins = Global_1.gameWining.freeSpins + this.freeSpins;
    };
    return WinData;
}());
