"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSymbols = exports.convertData = exports.generateMatrix = exports.weightedRandom = exports.bonusGameType = exports.specialIcons = exports.messageId = void 0;
var Global_1 = require("./Global");
var messageId;
(function (messageId) {
    messageId["auth"] = "Auth";
    messageId["spin"] = "Spin";
})(messageId || (exports.messageId = messageId = {}));
var specialIcons;
(function (specialIcons) {
    specialIcons["bonus"] = "Bonus";
    specialIcons["scatter"] = "Scatter";
    specialIcons["jackpot"] = "Jackpot";
    specialIcons["wild"] = "Wild";
    specialIcons["any"] = "any";
})(specialIcons || (exports.specialIcons = specialIcons = {}));
var bonusGameType;
(function (bonusGameType) {
    bonusGameType["tap"] = "tap";
    bonusGameType["spin"] = "spin";
    bonusGameType["default"] = "default";
})(bonusGameType || (exports.bonusGameType = bonusGameType = {}));
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
function convertSymbols(data) {
    var uiData = {
        symbols: []
    };
    data.forEach(function (element) {
        var _a;
        if (element.useWildSub || (!element.useWildSub && ((_a = element.multiplier) === null || _a === void 0 ? void 0 : _a.length) > 0)) {
            var symbolData = {
                ID: element.Id,
                multiplier: {}
            };
            var multiplierObject_1 = {};
            element.multiplier.forEach(function (item, index) {
                multiplierObject_1[(5 - index).toString() + 'x'] = item[0];
            });
            symbolData.multiplier = multiplierObject_1;
            uiData.symbols.push(symbolData);
        }
    });
    // const convertedData = data.map(symbol => {
    //   if (symbol.multiplier?.length>0 && symbol.useWildSub) {
    //     const multiplierObject = {};
    //     multiplierObject['5x'] = symbol.multiplier[0][0];
    //     multiplierObject['4x'] = symbol.multiplier[1][0];
    //     multiplierObject['3x'] = symbol.multiplier[2][0];
    //     return {
    //       ID: symbol.Id,
    //       multiplier: multiplierObject
    //     };
    //   } else {
    //     return null; // Exclude symbols without multipliers
    //   }
    // }).filter(symbol => symbol !== null); // Remove null values
    // console.log("converted data",{ symbols: convertedData });
    // return { symbols: convertedData };
    return uiData;
}
exports.convertSymbols = convertSymbols;
