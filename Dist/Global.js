"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayLines = exports.addPayLineSymbols = exports.gameWining = exports.UiInitData = exports.playerData = exports.gameSettings = void 0;
var testData_1 = require("./testData");
var utils_1 = require("./utils");
exports.gameSettings = {
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {},
    Symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', "10", "11", "12"],
    Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.1],
    // Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.01],
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
exports.playerData = {
    Balance: 1000,
    haveWon: 100,
};
exports.UiInitData = {
    paylines: (0, utils_1.convertSymbols)(testData_1.Symbols),
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
    addPayLineSymbols("0", 5, 0.1, 0);
    addPayLineSymbols("0", 4, 0.3, 0);
    addPayLineSymbols("0", 3, 0.5, 0);
    addPayLineSymbols("1", 5, 0.1, 0);
    addPayLineSymbols("1", 4, 0.3, 0);
    addPayLineSymbols("1", 3, 0.5, 0);
    addPayLineSymbols("2", 5, 0.1, 0);
    addPayLineSymbols("2", 4, 0.3, 0);
    addPayLineSymbols("2", 3, 0.5, 0);
    addPayLineSymbols("3", 5, 0.1, 0);
    addPayLineSymbols("3", 4, 0.3, 0);
    addPayLineSymbols("3", 3, 0.5, 0);
    addPayLineSymbols("4", 5, 0.1, 0);
    addPayLineSymbols("4", 4, 0.3, 0);
    addPayLineSymbols("4", 3, 0.5, 0);
    addPayLineSymbols("5", 5, 0.1, 0);
    addPayLineSymbols("5", 4, 0.3, 0);
    addPayLineSymbols("5", 3, 0.5, 0);
    addPayLineSymbols("6", 5, 0.1, 0);
    addPayLineSymbols("6", 4, 0.3, 0);
    addPayLineSymbols("6", 3, 0.5, 0);
    addPayLineSymbols("7", 5, 0.1, 0);
    addPayLineSymbols("7", 4, 0.3, 0);
    addPayLineSymbols("7", 3, 0.5, 0);
    addPayLineSymbols("8", 5, 0.1, 0);
    addPayLineSymbols("8", 4, 0.3, 0);
    addPayLineSymbols("8", 3, 0.5, 0);
    addPayLineSymbols("9", 5, 0.1, 10);
    addPayLineSymbols("9", 4, 0.3, 5);
    addPayLineSymbols("9", 3, 0.5, 3);
    (0, utils_1.setWild)("Wild", 10);
    (0, utils_1.addScatterPay)(5, 11, 5, 0);
    (0, utils_1.setJackpotSettings)("Jackpot", 12, 50000, 5);
}
exports.makePayLines = makePayLines;
