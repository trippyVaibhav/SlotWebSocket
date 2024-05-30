"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonusGameType = exports.specialIcons = exports.messageId = void 0;
;
var messageId;
(function (messageId) {
    messageId["auth"] = "Auth";
    messageId["spin"] = "Spin";
    messageId["gamble"] = "gamble";
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
