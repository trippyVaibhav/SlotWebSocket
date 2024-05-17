"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayLines = exports.addPayLineSymbols = exports.gameWining = exports.UiInitData = exports.playerData = exports.gameSettings = void 0;
var BonusResults_1 = require("./BonusResults");
var testData_1 = require("./testData");
var utils_1 = require("./utils");
exports.gameSettings = {
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    bonusPayTable: [],
    useScatter: true,
    useWild: true,
    wildSymbol: {},
    // Symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',"10","11","12"],
    // Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.01],
    Symbols: initSymbols(),
    Weights: initWeigts(),
    resultSymbolMatrix: [],
    lineData: [],
    fullPayTable: [],
    jackpot: {
        symbolName: 'Jackpot',
        symbolsCount: 6,
        defaultAmount: 1000,
        increaseValue: 1
    },
    bonus: {
        type: "spin",
        start: false,
        stopIndex: -1,
        game: new BonusResults_1.bonusGame(5),
    }
};
function initSymbols() {
    var symbols = [];
    for (var i = 0; i < testData_1.gameData.Symbols.length; i++) {
        symbols.push(testData_1.gameData.Symbols[i].Id.toString());
    }
    return symbols;
}
function initWeigts() {
    var weights = [];
    for (var i = 0; i < testData_1.gameData.Symbols.length; i++) {
        weights.push(testData_1.gameData.Symbols[i].weightedRandomness);
    }
    return weights;
}
exports.playerData = {
    Balance: 1000,
    haveWon: 0,
    haveUsed: 0
};
exports.UiInitData = {
    paylines: (0, utils_1.convertSymbols)(testData_1.gameData.Symbols),
    spclSymbolTxt: [],
    AbtLogo: {
        logoSprite: "https://iili.io/JrMCqPf.png",
        link: "https://dingding-game.vercel.app/login",
    },
    ToULink: "https://dingding-game.vercel.app/login",
    PopLink: "https://dingding-game.vercel.app/login",
};
exports.gameWining = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: 0,
    currentBet: 0,
};
function addPayLineSymbols(symbol, repetition, pay, freeSpins) {
    var line = Array(repetition).fill(symbol); // Create an array with 'repetition' number of 'symbol'
    if (line.length != exports.gameSettings.matrix.x) {
        var lengthToAdd = exports.gameSettings.matrix.x - line.length;
        for (var i = 0; i < lengthToAdd; i++)
            line.push("any");
    }
    exports.gameSettings.payLine.push({
        line: line,
        pay: pay,
        freeSpins: freeSpins
    });
    // if(!UiInitData.paylines[parseInt(symbol)]) UiInitData.paylines[parseInt(symbol)]= []
    // UiInitData.paylines[parseInt(symbol)].push(pay.toString());
    // console.log(gameSettings.payLine);
}
exports.addPayLineSymbols = addPayLineSymbols;
function makePayLines() {
    testData_1.gameData.Symbols.forEach(function (element) {
        var _a, _b;
        if (element.Id < 10 && ((_a = element.multiplier) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            (_b = element.multiplier) === null || _b === void 0 ? void 0 : _b.forEach(function (item, index) {
                addPayLineSymbols(element.Id.toString(), 5 - index, item[0], item[1]);
            });
        }
        else {
            handleSpecialSymbols(element);
            // addPayLineSymbols(element.Id.toString(),3, 0,0);
        }
    });
    // addPayLineSymbols("0", 5, 0.1, 0);
    // addPayLineSymbols("0", 4, 0.3, 0);
    // addPayLineSymbols("0", 3, 0.5, 0);
    // addPayLineSymbols("1", 5, 0.1, 0);
    // addPayLineSymbols("1", 4, 0.3, 0);
    // addPayLineSymbols("1", 3, 0.5, 0);
    // addPayLineSymbols("2", 5, 0.1, 0);
    // addPayLineSymbols("2", 4, 0.3, 0);
    // addPayLineSymbols("2", 3, 0.5, 0);
    // addPayLineSymbols("3", 5, 0.1, 0);
    // addPayLineSymbols("3", 4, 0.3, 0);
    // addPayLineSymbols("3", 3, 0.5, 0);
    // addPayLineSymbols("4", 5, 0.1, 0);
    // addPayLineSymbols("4", 4, 0.3, 0);
    // addPayLineSymbols("4", 3, 0.5, 0);
    // addPayLineSymbols("5", 5, 0.1, 0);
    // addPayLineSymbols("5", 4, 0.3, 0);
    // addPayLineSymbols("5", 3, 0.5, 0);
    // addPayLineSymbols("6", 5, 0.1, 0);
    // addPayLineSymbols("6", 4, 0.3, 0);
    // addPayLineSymbols("6", 3, 0.5, 0);
    // addPayLineSymbols("7", 5, 0.1, 0);
    // addPayLineSymbols("7", 4, 0.3, 0);
    // addPayLineSymbols("7", 3, 0.5, 0);
    // addPayLineSymbols("8", 5, 0.1, 0);
    // addPayLineSymbols("8", 4, 0.3, 0);
    // addPayLineSymbols("8", 3, 0.5, 0);
    // addPayLineSymbols("9", 5, 0.1, 10);
    // addPayLineSymbols("9", 4, 0.3, 5);
    // addPayLineSymbols("9", 3, 0.5, 3);
    // setWild("Wild", 10);
    // addScatterPay(5, 11, 5, 0);
    // setJackpotSettings("Jackpot", 12, 50000, 5);
}
exports.makePayLines = makePayLines;
function handleSpecialSymbols(symbol) {
    switch (symbol.Name) {
        case "Jackpot":
            exports.gameSettings.jackpot.symbolName = symbol.Name;
            exports.gameSettings.jackpot.symbolsCount = symbol.Id;
            exports.gameSettings.jackpot.defaultAmount = symbol.defaultAmount;
            exports.gameSettings.jackpot.increaseValue = symbol.increaseValue;
            break;
        case "Wild":
            exports.gameSettings.wildSymbol.SymbolName = symbol.Name;
            exports.gameSettings.wildSymbol.SymbolID = symbol.Id;
            break;
        case "Scatter":
            exports.gameSettings.scatterPayTable.push({
                symbolCount: symbol.count,
                symbolID: symbol.Id,
                pay: symbol.pay,
                freeSpins: symbol.freeSpin
            });
            break;
        case "Bonus":
            exports.gameSettings.bonusPayTable.push({
                symbolCount: symbol.symbolCount,
                symbolID: symbol.Id,
                pay: symbol.pay,
                highestPayMultiplier: symbol.highestMultiplier
            });
            break;
        default:
            break;
    }
}
// export function setJackpotSettings(symbolName: string, symbolID: number, defaultAmount: number, increaseValue: number): void {
//     gameSettings.jackpot.symbolName = symbolName;
//     gameSettings.jackpot.symbolsCount = symbolID;
//     gameSettings.jackpot.defaultAmount = defaultAmount;
//     gameSettings.jackpot.increaseValue = increaseValue;
// }
// // Function to set the Wild Symbol
// export function setWild(symbolName: string, symbol: number) {
//     gameSettings.wildSymbol.SymbolName = symbolName;
//     gameSettings.wildSymbol.SymbolID = symbol;
// }
// export function addScatterPay(symbolName: number, symbolID: number, pay: number, freeSpins: number): void {
//     gameSettings.scatterPayTable.push({
//     symbolCount: symbolName,
//     symbolID: symbolID,
//     pay: pay,
//     freeSpins: freeSpins
//     });
// }
