"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomResultGenerator = exports.sendInitdata = void 0;
var App_1 = require("./App");
var BonusResults_1 = require("./BonusResults");
var Global_1 = require("./Global");
var utils_1 = require("./utils");
function sendInitdata(clientID) {
    var _a;
    var matrix = (0, utils_1.generateMatrix)(Global_1.gameSettings.matrix.x, 18);
    if (Global_1.gameSettings.currentGamedata.bonus.isEnabled && Global_1.gameSettings.currentGamedata.bonus.type == utils_1.bonusGameType.spin)
        Global_1.gameSettings.bonus.game = new BonusResults_1.bonusGame(8);
    var specialSymbols = Global_1.gameSettings.currentGamedata.Symbols.filter(function (element) { return !element.useWildSub; }).length;
    console.log("specialSymbols", specialSymbols);
    for (var i = 0; i < specialSymbols; i++) {
        var strng = "Player has the right to start the slot machine without using their funds for a certain number of times. The size of the bet is determined by the";
        Global_1.UiInitData.spclSymbolTxt.push(strng);
    }
    var dataToSend = {
        "GameData": {
            "Reel": matrix,
            "Lines": Global_1.gameSettings.currentGamedata.linesApiData,
            "Bets": Global_1.gameSettings.currentGamedata.Bets,
            "canSwitchLines": false,
            "LinesCount": Global_1.gameSettings.currentGamedata.LinesCount,
            "autoSpin": [1, 5, 10, 20],
        },
        "BonusData": Global_1.gameSettings.bonus.game != null ? Global_1.gameSettings.bonus.game.generateData((_a = Global_1.gameSettings.bonusPayTable[0]) === null || _a === void 0 ? void 0 : _a.pay) : null,
        "UIData": Global_1.UiInitData,
        "PlayerData": Global_1.playerData,
    };
    (0, App_1.sendMessageToClient)(clientID, "InitData", dataToSend);
}
exports.sendInitdata = sendInitdata;
var RandomResultGenerator = /** @class */ (function () {
    function RandomResultGenerator() {
        // Generating a 3x5 matrix of random numbers based on weights
        var matrix = [];
        for (var i = 0; i < Global_1.gameSettings.matrix.y; i++) {
            var row = [];
            for (var j = 0; j < Global_1.gameSettings.matrix.x; j++) {
                var randomIndex = this.randomWeightedIndex(Global_1.gameSettings.Weights);
                row.push(Global_1.gameSettings.Symbols[randomIndex]);
            }
            matrix.push(row);
        }
        matrix.pop();
        matrix.pop();
        matrix.pop();
        matrix.push(['7', '7', '7', '7', '7']);
        matrix.push(['6', '6', '6', '8', '4']);
        matrix.push(['0', '0', '0', '0', '0']);
        Global_1.gameSettings.resultSymbolMatrix = matrix;
    }
    // Function to generate a random number based on weights
    RandomResultGenerator.prototype.randomWeightedIndex = function (weights) {
        var totalWeight = weights.reduce(function (acc, val) { return acc + val; }, 0);
        var randomNumber = Math.random() * totalWeight;
        var weightSum = 0;
        for (var i = 0; i < weights.length; i++) {
            weightSum += weights[i];
            if (randomNumber <= weightSum) {
                return i;
            }
        }
        // Default to last index if not found
        return weights.length - 1;
    };
    return RandomResultGenerator;
}());
exports.RandomResultGenerator = RandomResultGenerator;
