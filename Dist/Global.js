"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWild = exports.setJackpotSettings = exports.addScatterPay = exports.makePayLines = exports.removeDuplicateArrays = exports.addPayLineSymbols = exports.gameWining = exports.gameSettings = void 0;
;
exports.gameSettings = {
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {},
    Symbols: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    Weights: [5, 5, 5, 5, 0.5, 0.5, 0.5, 0.5, 0.01, 0.01],
    resultSymbolMatrix: [],
    lineData: [],
    fullPayTable: [],
    jackpot: {
        symbolName: 'Jackpot',
        symbolsCount: 6,
        defaultAmount: 1000,
        increaseValue: 1
    }
};
;
exports.gameWining = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: null,
    currentBet: null,
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
    // console.log(gameSettings.payLine);
}
exports.addPayLineSymbols = addPayLineSymbols;
function removeDuplicateArrays(arrayOfArrays) {
    var uniqueArrays = [];
    var seen = new Set();
    arrayOfArrays.forEach(function (subArray) {
        var subArrayString = JSON.stringify(subArray); // Convert sub-array to string for comparison
        if (!seen.has(subArrayString)) {
            uniqueArrays.push(subArray);
            seen.add(subArrayString);
        }
    });
    return uniqueArrays;
}
exports.removeDuplicateArrays = removeDuplicateArrays;
function makePayLines() {
    for (var i = 0; i < 10; i++) {
        for (var rep = 5; rep >= 3; rep--) {
            addPayLineSymbols(i.toString(), rep, 5, 0);
        }
    }
    setWild("Wild", 10);
    addScatterPay(5, 11, 5, 0);
    setJackpotSettings("Jackpot", 12, 50, 5);
}
exports.makePayLines = makePayLines;
// Function to add a scatter pay table entry to the game settings
function addScatterPay(symbolName, symbolID, pay, freeSpins) {
    exports.gameSettings.scatterPayTable.push({
        symbolCount: symbolName,
        symbolID: symbolID,
        pay: pay,
        freeSpins: freeSpins
    });
}
exports.addScatterPay = addScatterPay;
// Function to set the jackpot settings
function setJackpotSettings(symbolName, symbolID, defaultAmount, increaseValue) {
    exports.gameSettings.jackpot.symbolName = symbolName;
    exports.gameSettings.jackpot.symbolsCount = symbolID;
    exports.gameSettings.jackpot.defaultAmount = defaultAmount;
    exports.gameSettings.jackpot.increaseValue = increaseValue;
}
exports.setJackpotSettings = setJackpotSettings;
// Function to set the Wild Symbol
function setWild(symbolName, symbol) {
    exports.gameSettings.wildSymbol.SymbolName = symbolName;
    exports.gameSettings.wildSymbol.SymbolID = symbol;
}
exports.setWild = setWild;
// // Example usage:
// addPayLine('Wick', 5, 3, 0); // 'Wick' symbol repeated 5 times
// addScatterPay(5, 0, 5);
// setJackpotSettings('MyJackpot', 6, 1000, 1);
