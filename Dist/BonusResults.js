"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bonusGame = void 0;
var Global_1 = require("./Global");
var bonusGame = /** @class */ (function () {
    function bonusGame(nosOfItem, totalPay, minPercent) {
        this.noOfItems = nosOfItem;
        this.type = "default";
        this.totalPay = totalPay;
        this.result = [];
        this.minPay = Math.floor(minPercent * this.totalPay);
        this.noise = minPercent;
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
    bonusGame.prototype.generateData = function () {
        var res = [];
        var sum = 0;
        var part = Math.floor(this.totalPay / (this.noOfItems - 1));
        // this.noise=Math.abs(part/2);
        // if(part<this.minPay){
        //     for (let i = 0; i < this.noOfItems-3; i++) {
        //         if(i==this.noOfItems-4){
        //             res.push(part-this.noise);
        //         }
        //         res.push(part);
        //         sum+=part;
        //     }
        //     res.push(this.minPay);
        // }else{
        //     for (let i = 0; i < this.noOfItems-2; i++) {
        //         res.push(part);
        //         sum+=part;
        //     }
        // }
        for (var i = 0; i < this.noOfItems - 1; i++) {
            res.push(part);
            sum += part;
        }
        for (var i = 0; i < res.length; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var deviation = Math.floor(Math.random() * this.noise * (i + 1));
            res[i] -= deviation;
            res[j] += deviation;
        }
        res.push((this.totalPay - sum));
        res.push("-1");
        this.shuffle(res);
        for (var i = 0; i < res.length; i++) {
            this.result.push(res[i].toString());
        }
        Global_1.gameSettings.bonus.start = false;
        if (Global_1.gameSettings.bonus.type == "spin" && Global_1.gameSettings.bonus.start)
            Global_1.gameSettings.bonus.stopIndex = Math.round(Math.random() * this.noOfItems);
        return this.result;
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
