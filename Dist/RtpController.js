"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conrtolWeights = void 0;
var Global_1 = require("./Global");
function conrtolWeights(haveWon, haveUsed) {
    if (haveWon == 0)
        return;
    if (haveWon < haveUsed) {
        Global_1.gameSettings.currentGamedata.Symbols.forEach(function (element) {
            if ((element === null || element === void 0 ? void 0 : element.Id) > 10) {
                // element.weightedRandomness+=(haveWon/haveUsed)
                // console.log("changed weight:",(haveWon/haveUsed));
            }
        });
    }
}
exports.conrtolWeights = conrtolWeights;
