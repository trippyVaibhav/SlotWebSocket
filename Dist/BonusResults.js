"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonusGame = void 0;
var Global_1 = require("./Global");
var utils_1 = require("./utils");
var bonusGame = /** @class */ (function () {
    function bonusGame(nosOfItem, clientId) {
        this.noOfItems = nosOfItem;
        this.type = utils_1.bonusGameType.default;
        this.result = [];
        this.clientId = clientId;
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
    bonusGame.prototype.generateSlotData = function (reps) {
        if (reps === void 0) { reps = 0; }
        var res = [];
        var slot_array = [];
        var multiplier_array = [];
        // for (let index = 0; index < 3; index++) {
        //     slot_array.push(Math.floor(Math.random()*12));
        // }
        slot_array.push(1);
        slot_array.push(2);
        slot_array.push(1);
        //    let reelNum: number=Math.floor(Math.random()*12);
        var reelNum = 1;
        if (!slot_array.includes(reelNum)) {
            reelNum = -1;
        }
        slot_array.forEach(function (element) {
            if (element === reelNum)
                multiplier_array.push(Global_1.gameSettings.currentGamedata.bonus.payTable[element]);
            else
                multiplier_array.push(0);
        });
        this.result = __spreadArray(__spreadArray(__spreadArray([], slot_array, true), [reelNum], false), multiplier_array, true);
        for (var i = 0; i < this.result.length; i++) {
            res.push(this.result[i].toString());
        }
        return res;
    };
    // slotCalculation(){
    //     let slot_array: number[]=[];
    //     let multiplier_array: number[]=[];
    //     slot_array.push(1);
    //     slot_array.push(2);
    //     slot_array.push(1);
    //    let reelNum: number=5;
    //     if(!slot_array.includes(reelNum)){
    //         reelNum=-1;
    //     }
    //    slot_array.forEach((element)=>{
    //     if(element===reelNum)
    //         multiplier_array.push(gameSettings.currentGamedata.bonus.payTable[element]);
    //     else 
    //         multiplier_array.push(0);
    //    })
    //    return [...slot_array,reelNum,...multiplier_array]
    // }
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
        else if (Global_1.gameSettings.bonus.start && Global_1.gameSettings.currentGamedata.bonus.type == "slot") {
            Global_1.gameSettings.bonus.stopIndex = -1;
            for (var index = 1; index < 4; index++) {
                amount += Global_1.gameSettings.currentBet * this.result[this.result.length - index];
            }
            // amount=gameSettings.currentBet*this.result[this.result.length-1];
            console.log("amount", amount);
            console.log("current bet", Global_1.gameSettings.currentBet);
        }
        if (!amount || amount < 0)
            amount = 0;
        Global_1.gameSettings.bonus.stopIndex = -1;
        return amount;
        // playerData.Balance += amount;
        // playerData.haveWon += amount;
        // playerData.currentWining=amount;
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
