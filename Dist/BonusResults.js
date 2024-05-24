"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonusGame = void 0;
var Global_1 = require("./Global");
var utils_1 = require("./utils");
var bonusGame = /** @class */ (function () {
    function bonusGame(nosOfItem) {
        this.noOfItems = nosOfItem;
        this.type = utils_1.bonusGameType.default;
        this.result = [];
        // this.noise=noise;
    }
    bonusGame.prototype.generateData = function (totalPay) {
        this.result = [];
        var res = [];
        var sum = 0;
        this.totalPay = totalPay;
        this.maxPay = Math.floor(totalPay * 0.5);
        var part = Math.floor((this.totalPay - this.maxPay) / (this.noOfItems - 2));
        this.noise = Math.floor(part / (this.noOfItems - 2));
        for (var i = 0; i < this.noOfItems - 2; i++) {
            this.result.push(part);
            sum += part;
        }
        for (var i = 0; i < this.result.length; i++) {
            var min = this.noise * i > 0 ? this.noise * i : this.noise;
            var max = this.noise * (i + 1);
            var j = this.result.length - 1 - i;
            var deviation = Math.floor(Math.random() * (max - min) + min);
            this.result[i] -= deviation;
            this.result[j] += deviation;
        }
        var diff = this.totalPay - this.maxPay - sum;
        this.result[Math.floor(Math.random() * res.length)] += diff;
        this.result.push(-1);
        this.result.push(this.maxPay);
        this.shuffle(this.result);
        for (var i = 0; i < this.result.length; i++) {
            res.push(this.result[i].toString());
        }
        return res;
    };
    bonusGame.prototype.setRandomStopIndex = function () {
        var amount = 0;
        if (Global_1.gameSettings.bonus.start && Global_1.gameSettings.currentGamedata.bonus.type == utils_1.bonusGameType.spin) {
            Global_1.gameSettings.bonus.stopIndex = Math.round(Math.random() * this.noOfItems);
            amount = this.result[Global_1.gameSettings.bonus.stopIndex];
        }
        else if (Global_1.gameSettings.bonus.start && Global_1.gameSettings.currentGamedata.bonus.type == utils_1.bonusGameType.tap) {
            Global_1.gameSettings.bonus.stopIndex = -1;
            this.result.forEach(function (element) {
                if (element >= 0) {
                    amount += element;
                }
            });
        }
        if (!amount || amount < 0)
            amount = 0;
        Global_1.playerData.Balance += amount;
        Global_1.playerData.haveWon += amount;
        Global_1.gameSettings.bonus.start = false;
        Global_1.gameSettings.bonus.stopIndex = -1;
    };
    bonusGame.prototype.shuffle = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var k = array[i];
            array[i] = array[j];
            array[j] = k;
        }
    };
    return bonusGame;
}());
exports.bonusGame = bonusGame;
