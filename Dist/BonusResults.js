"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonusGame = void 0;
var Global_1 = require("./Global");
var bonusGame = /** @class */ (function () {
    function bonusGame(nosOfItem) {
        this.noOfItems = nosOfItem;
        this.type = "default";
        this.result = [];
        // this.noise=noise;
    }
    // generateData(){
    //     let tempSum=0;
    //         this.multiplier=[];
    //         for (let i = 0; i < this.noOfItems-2; i++) {
    //             let pay=0
    //             while(true){
    //                 if(i==0)
    //                 pay=Math.round((Math.random()/this.noOfItems)*(this.totalPay));
    //                 else
    //                 pay=Math.round((Math.random()/this.noOfItems)*(this.totalPay - this.result[i-1]));
    //                 tempSum+=pay;
    //                 if(!this.result.includes(pay) && (tempSum<this.totalPay) && pay>0){
    //                     this.result.push(pay);
    //                     console.log("pay",pay);
    //                     break;
    //                 }else{
    //                     tempSum-=pay;
    //                 }
    //             }
    //         }
    //         this.result.push(this.totalPay-tempSum);
    //         this.result.push(-1);
    //         this.shuffle(this.result);
    //     return {
    //         "result":this.result
    //     };
    // }
    bonusGame.prototype.generateData = function (totalPay) {
        this.result = [];
        var res = [];
        var sum = 0;
        this.totalPay = totalPay;
        this.maxPay = Math.floor(totalPay * 0.5);
        var part = Math.floor((this.totalPay - this.maxPay) / (this.noOfItems - 2));
        this.noise = Math.floor(part / (this.noOfItems - 2));
        for (var i = 0; i < this.noOfItems - 2; i++) {
            res.push(part);
            sum += part;
        }
        for (var i = 0; i < res.length; i++) {
            var min = this.noise * i > 0 ? this.noise * i : this.noise;
            var max = this.noise * (i + 1);
            var j = res.length - 1 - i;
            var deviation = Math.floor(Math.random() * (max - min) + min);
            res[i] -= deviation;
            res[j] += deviation;
        }
        var diff = this.totalPay - this.maxPay - sum;
        res[Math.floor(Math.random() * res.length)] += diff;
        res.push("-1");
        res.push(this.maxPay);
        this.shuffle(res);
        for (var i = 0; i < res.length; i++) {
            this.result.push(res[i].toString());
        }
        return this.result;
    };
    bonusGame.prototype.setRandomStopIndex = function () {
        if (Global_1.gameSettings.bonus.type == "spin" && Global_1.gameSettings.bonus.start)
            Global_1.gameSettings.bonus.stopIndex = Math.round(Math.random() * this.noOfItems);
        Global_1.playerData.Balance += parseInt(this.result[Global_1.gameSettings.bonus.stopIndex]);
        Global_1.playerData.haveWon += parseInt(this.result[Global_1.gameSettings.bonus.stopIndex]);
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
