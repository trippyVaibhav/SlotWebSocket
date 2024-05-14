"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSymbols = exports.setWild = exports.setJackpotSettings = exports.addScatterPay = exports.convertData = exports.generateMatrix = exports.weightedRandom = void 0;
var Global_1 = require("./Global");
;
;
function weightedRandom(items, weights) {
    if (items.length !== weights.length) {
        throw new Error('Items and weights must be of the same size');
    }
    if (!items.length) {
        throw new Error('Items must not be empty');
    }
    // Preparing the cumulative weights array.
    var cumulativeWeights = [];
    for (var i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    // Getting the random number in a range of [0...sum(weights)]
    var maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    var randomNumber = maxCumulativeWeight * Math.random();
    // Picking the random item based on its weight.
    for (var itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
            return {
                item: items[itemIndex],
                index: itemIndex,
            };
        }
    }
    // This should not happen if the weights are correctly defined,
    // but if we get here, return the last item.
    return {
        item: items[items.length - 1],
        index: items.length - 1,
    };
}
exports.weightedRandom = weightedRandom;
// Function to generate a 5x18 matrix of randomly selected items based on weights
function generateMatrix(n_Rows, n_Columns) {
    var matrix = [];
    for (var i = 0; i < n_Rows; i++) {
        var row = [];
        for (var j = 0; j < n_Columns; j++) {
            var result = weightedRandom(Global_1.gameSettings.Symbols, Global_1.gameSettings.Weights);
            row.push(result.item);
        }
        matrix.push(row);
    }
    // console.log(matrix);
    return matrix;
}
exports.generateMatrix = generateMatrix;
function convertData(data) {
    var result = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var row = data_1[_i];
        var convertedRow = Array.from(Array(row.length + 1).keys()).join(",");
        result.push("\"".concat(convertedRow, "\""));
    }
    return result;
}
exports.convertData = convertData;
// Function to add a scatter pay table entry to the game settings
function addScatterPay(symbolCount, symbolID, pay, freeSpins) {
    Global_1.gameSettings.scatterPayTable.push({
        symbolCount: symbolCount,
        symbolID: symbolID,
        pay: pay,
        freeSpins: freeSpins
    });
}
exports.addScatterPay = addScatterPay;
// Function to set the jackpot settings
function setJackpotSettings(symbolName, symbolID, defaultAmount, increaseValue) {
    Global_1.gameSettings.jackpot.symbolName = symbolName;
    Global_1.gameSettings.jackpot.symbolsCount = symbolID;
    Global_1.gameSettings.jackpot.defaultAmount = defaultAmount;
    Global_1.gameSettings.jackpot.increaseValue = increaseValue;
}
exports.setJackpotSettings = setJackpotSettings;
// Function to set the Wild Symbol
function setWild(symbolName, symbol) {
    Global_1.gameSettings.wildSymbol.SymbolName = symbolName;
    Global_1.gameSettings.wildSymbol.SymbolID = symbol;
}
exports.setWild = setWild;
function convertSymbols(data) {
    var convertedData = data.map(function (symbol) {
        if (symbol.multiplier1) {
            var multiplierObject = {};
            multiplierObject['5x'] = symbol.multiplier1[0];
            multiplierObject['4x'] = symbol.multiplier1[1];
            multiplierObject['3x'] = symbol.multiplier1[2];
            return {
                ID: symbol.ID,
                multiplier: multiplierObject
            };
        }
        else {
            return null; // Exclude symbols without multipliers
        }
    }).filter(function (symbol) { return symbol !== null; }); // Remove null values
    return { symbols: convertedData };
}
exports.convertSymbols = convertSymbols;
