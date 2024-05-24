"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayLines = exports.CheckResult = void 0;
var Alerts_1 = require("./Alerts");
var App_1 = require("./App");
var Global_1 = require("./Global");
var SlotDataInit_1 = require("./SlotDataInit");
var BonusResults_1 = require("./BonusResults");
var utils_1 = require("./utils");
var CheckResult = /** @class */ (function () {
    function CheckResult(clientID) {
        this.clientID = clientID;
        if (Global_1.gameSettings.currentGamedata.bonus.isEnabled && Global_1.gameSettings.currentGamedata.bonus.type == utils_1.bonusGameType.tap)
            Global_1.gameSettings.bonus.game = new BonusResults_1.bonusGame(Global_1.gameSettings.currentGamedata.bonus.noOfItem);
        // if(playerData.Balance < gameWining.currentBet)
        if (Global_1.playerData.Balance < Global_1.gameSettings.currentBet) {
            (0, Alerts_1.Alerts)(clientID, "Low Balance");
            return;
        }
        console.log("CurrentBet : " + Global_1.gameSettings.currentBet);
        Global_1.playerData.Balance -= Global_1.gameSettings.currentBet;
        console.log("player balance:", Global_1.playerData.Balance);
        console.log("player havewon:", Global_1.playerData.haveWon);
        var rng = new SlotDataInit_1.RandomResultGenerator();
        this.scatter = utils_1.specialIcons.scatter;
        //     gameSettings.currentGamedata.Symbols?.forEach(element => {
        //         if(element.Name==specialIcons.bonus)
        //         this.bonus=element.Id.toString()
        // });
        this.useScatter = (Global_1.gameSettings.useScatter && this.scatter !== null);
        this.jackpot = Global_1.gameSettings.jackpot;
        this.useJackpot = (this.jackpot !== null);
        this.scatterPayTable = Global_1.gameSettings.scatterPayTable;
        this.bonusPaytable = Global_1.gameSettings.bonusPayTable;
        this.reels = Global_1.gameSettings.resultSymbolMatrix;
        // this.scatterWin = [];
        // this.jackpotWin = [];
        // gameWining.WinningLines = [];
        // gameWining.winningSymbols = [];
        // gameWining.TotalWinningAmount = 0;
        this.scatterWinSymbols = [];
        this.jackpotWinSymbols = [];
        this.winSeq = null;
        this.winData = new WinData();
        this.bonusResult = [];
        this.searchWinSymbols();
    }
    CheckResult.prototype.searchWinSymbols = function () {
        console.log('search win symbols');
        // gameWining.freeSpins = 0;
        // gameWining.winningSymbols = [];
        // gameWining.WinningLines = [];
        // gameWining.TotalWinningAmount = 0;
        this.checkForWin();
        this.checkForScatter();
        this.checkForBonus();
        this.checkForJackpot();
        // let excludeindex: number[] = [];
        // for (let i = 0; i < this.winData.winningSymbols.length; i++) {
        //     for (let j = i + 1; j < this.winData.winningSymbols.length; j++) {
        //         if (this.winData.winningSymbols[i].some(ai => this.winData.winningSymbols[j].includes(ai)))
        //             excludeindex.push(j);
        //     }
        // }
        // let excludeindexModified: number[] = excludeindex.filter((value, index, array) => array.indexOf(value) === index);
        // for (let i = excludeindexModified.length - 1; i >= 0; i--) {
        //     this.winData.winningSymbols.splice(excludeindexModified[i], 1);
        // }
        this.winData.winningLines = this.winData.winningLines.filter(function (value, index, array) { return array.indexOf(value) === index; });
        this.winData.updateBalance();
        console.log("result :", Global_1.gameSettings.resultSymbolMatrix);
        console.log("win data", this.winData);
        this.makeResultJson();
        // Math.round(num * 100) / 100).toFixed(2)
        console.log("TOTAL WINING : " + this.winData.totalWinningAmount);
        // console.log(gameWining.WinningLines);
        // console.log(gameWining.winningSymbols);
        console.log("_____________RESULT_END________________");
    };
    CheckResult.prototype.checkForBonus = function () {
        var _this = this;
        if (!Global_1.gameSettings.currentGamedata.bonus.isEnabled)
            return;
        var bonusSymbols = [];
        var temp = this.findSymbol(utils_1.specialIcons.bonus);
        if (temp.length > 0)
            bonusSymbols.push.apply(bonusSymbols, temp);
        this.bonusPaytable.forEach(function (element) {
            var _a;
            if (element.symbolCount > 0 && element.symbolCount == bonusSymbols.length) {
                // bonuswin = new WinData(bonusSymbols, 0, 0);
                _this.winData.winningSymbols.push(bonusSymbols);
                // this.winData.bonus=true;
                Global_1.gameSettings.bonus.start = true;
                if (Global_1.gameSettings.currentGamedata.bonus.type == utils_1.bonusGameType.tap)
                    _this.bonusResult = Global_1.gameSettings.bonus.game.generateData((_a = Global_1.gameSettings.bonusPayTable[0]) === null || _a === void 0 ? void 0 : _a.pay);
                Global_1.gameSettings.bonus.game.setRandomStopIndex();
            }
        });
    };
    CheckResult.prototype.checkForWin = function () {
        var _this = this;
        var allComboWin = [];
        Global_1.gameSettings.lineData.forEach(function (lb, index) {
            var win = null;
            Global_1.gameSettings.fullPayTable.forEach(function (Payline) {
                //  find max win (or win with max symbols count)
                var winTemp = _this.getPayLineWin(Payline, lb, allComboWin);
                if (winTemp != null) {
                    if (win == null)
                        win = winTemp;
                    else {
                        if (win.Pay < winTemp.pay || win.FreeSpins < winTemp.freeSpins)
                            win = winTemp;
                    }
                    // gameWining.WinningLines.push(index);
                    _this.winData.winningLines.push(index);
                    console.log("Line Index : ".concat(index, " : ") + lb + ' - line win: ' + win);
                }
            });
        });
        var filteredArray = this.checkforDuplicate(allComboWin);
        console.log("wining symbols", filteredArray);
        filteredArray.forEach(function (element) {
            _this.winData.winningSymbols.push(element.pos);
            _this.winData.totalWinningAmount += element.pay;
            _this.winData.freeSpins += element.freeSpin;
        });
    };
    CheckResult.prototype.checkforDuplicate = function (allComboWin) {
        var _this = this;
        allComboWin.sort(function (a, b) { return b.pos.length - a.pos.length; });
        var filteredArray = [];
        var _loop_1 = function (currentItem) {
            var isSubsetOfAny = filteredArray.some(function (item) { return item.symbol === currentItem.symbol && _this.isSubset(currentItem.pos, item.pos); });
            if (!isSubsetOfAny) {
                filteredArray.push(currentItem);
            }
        };
        for (var _i = 0, allComboWin_1 = allComboWin; _i < allComboWin_1.length; _i++) {
            var currentItem = allComboWin_1[_i];
            _loop_1(currentItem);
        }
        return filteredArray;
    };
    CheckResult.prototype.isSubset = function (subset, superset) {
        var supersetSet = new Set(superset);
        return subset.every(function (elem) { return supersetSet.has(elem); });
    };
    CheckResult.prototype.checkForScatter = function () {
        var _a;
        var _this = this;
        this.scatterWinSymbols = [];
        // this.scatterWin = null;
        if (this.useScatter) {
            console.log("scattersds", this.scatter);
            var temp = this.findSymbol(this.scatter);
            if (temp.length > 0)
                (_a = this.scatterWinSymbols).push.apply(_a, temp);
            this.scatterPayTable.forEach(function (sPL) {
                if (sPL.symbolCount > 0 && sPL.symbolCount == _this.scatterWinSymbols.length) {
                    _this.winData.winningSymbols.push(_this.scatterWinSymbols);
                    _this.winData.freeSpins += sPL.freeSpins;
                    _this.winData.totalWinningAmount += sPL.pay;
                }
            });
            // if (this.scatterWin == null) this.scatterWinSymbols = [];
        }
    };
    CheckResult.prototype.checkForJackpot = function () {
        // this.jackpotWinSymbols = [];
        // this.jackpotWin = [];
        var _a;
        if (this.useJackpot) {
            var temp = this.findSymbol(this.jackpot.symbolName);
            if (temp.length > 0)
                (_a = this.jackpotWinSymbols).push.apply(_a, temp);
            console.log('find Jackpot symbols: ' + this.jackpotWinSymbols);
            if (this.jackpot.symbolsCount > 0 && this.jackpot.symbolsCount == this.jackpotWinSymbols.length) {
                this.winData.winningSymbols.push(this.jackpotWinSymbols);
                this.winData.totalWinningAmount += this.jackpot.defaultAmount;
                this.winData.jackpotwin += this.jackpot.defaultAmount;
                //TODO :ADD JACKPOT WIN PAYMENT FOR THE FINAL JSON (done)
            }
        }
    };
    CheckResult.prototype.getPayLineWin = function (payLine, lineData, allComboWin) {
        if (payLine == null)
            return null;
        var master = [];
        var winSymbols = [];
        for (var i = 0; i < lineData.length; i++) {
            var winSymbols1 = {
                pos: [],
                symbol: '',
                pay: 0,
                freeSpin: 0
            };
            var symbol = this.getSymbolOnMatrix(i);
            var s = symbol[lineData[i]];
            winSymbols1.symbol = s;
            if (payLine.line[i] !== utils_1.specialIcons.any && s !== payLine.line[i]) {
                return;
            }
            else if (payLine.line[i] !== utils_1.specialIcons.any && s === payLine.line[i]) {
                var symbolIndex = i.toString() + ',' + lineData[i].toString();
                // winSymbols.push(symbolIndex);
                winSymbols1.pos.push(symbolIndex);
                winSymbols1.pay = payLine.pay;
                winSymbols1.freeSpin = payLine.freeSpins;
            }
            master.push(winSymbols1);
        }
        console.log("master12", master);
        var filteredArray = master.filter(function (item) { return item.pos.length > 0; });
        var groupedBySymbol = filteredArray.reduce(function (acc, item) {
            if (!acc[item.symbol]) {
                acc[item.symbol] = { symbol: item.symbol, pos: [], pay: item.pay, freeSpin: item.freeSpin };
            }
            acc[item.symbol].pos = acc[item.symbol].pos.concat(item.pos);
            return acc;
        }, {});
        // Step 3: Convert the grouped object back into an array of objects
        var mergedArray = Object.values(groupedBySymbol);
        console.log("merged array", mergedArray);
        if (!payLine.pay)
            payLine.pay = 0;
        allComboWin.push.apply(allComboWin, mergedArray);
        // this.winData.freeSpins += payLine.freeSpins;
        // this.winData.totalWinningAmount += payLine.pay
        // const winData=new WinData(winSymbols, payLine.freeSpins, payLine.pay);
        return { freeSpins: payLine.freeSpins, pay: payLine.pay };
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
        for (var i = 0; i < Global_1.gameSettings.resultSymbolMatrix.length; i++) {
            for (var j = 0; j < Global_1.gameSettings.resultSymbolMatrix[i].length; j++) {
                if (Global_1.gameSettings.resultSymbolMatrix[i][j] == symbolId.toString())
                    foundArray.push(j.toString() + ',' + i.toString());
            }
        }
        return foundArray;
    };
    CheckResult.prototype.makeResultJson = function () {
        //TODO : Try to send the jackpot win data without initializie a variable;
        this.winData.totalWinningAmount = (Math.round(this.winData.totalWinningAmount * 100) / 100);
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
                jackpot: this.winData.jackpotwin,
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
            if (sName !== utils_1.specialIcons.any && sName !== this.wild) {
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
exports.PayLines = PayLines;
var WinData = /** @class */ (function () {
    function WinData() {
        this.totalWinningAmount = 0;
        this.jackpotwin = 0;
        this.freeSpins = 0;
        this.winningLines = [];
        this.winningSymbols = [];
    }
    WinData.prototype.updateBalance = function () {
        // gameWining.TotalWinningAmount += this.pay;
        Global_1.playerData.Balance += this.totalWinningAmount;
        Global_1.playerData.haveWon += this.totalWinningAmount;
        // gameWining.freeSpins = gameWining.freeSpins+this.freeSpins;
    };
    return WinData;
}());
