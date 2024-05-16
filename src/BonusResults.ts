import { gameSettings } from "./Global";

export class bonusGame{
    type:String;
    noOfItems:number;
    totalPay:number;
    result:string[];
    noise:number;
    minPay:number;

    constructor(nosOfItem:number, totalPay:number, minPercent:number) {
        this.noOfItems=nosOfItem;
        this.type="default";
        this.totalPay=totalPay;
        this.result=[];
        this.minPay=Math.floor(minPercent*this.totalPay);
        this.noise=minPercent;
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
    
    generateData():string[] {
        let res=[];
        let sum = 0;
        
        let part=Math.floor(this.totalPay/(this.noOfItems-1));

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

            for (let i = 0; i < this.noOfItems-1; i++) {
                res.push(part);
                sum+=part;
            }

        for (let i = 0; i < res.length; i++) {
            let j = Math.floor(Math.random() * (i+1));
            let deviation=Math.floor(Math.random()*this.noise*(i+1));
            res[i]-=deviation;
            res[j]+=deviation;
            
        }
        res.push((this.totalPay - sum));
        res.push("-1");
        this.shuffle(res);

        for (let i = 0; i < res.length; i++) {
            this.result.push(res[i].toString());
        }

        gameSettings.bonus.start= false;

        if(gameSettings.bonus.type=="spin" && gameSettings.bonus.start)
        gameSettings.bonus.stopIndex=Math.round(Math.random()*this.noOfItems);

        return this.result;
        
    }

    shuffle(array:string[]) {
        for (let i = array.length -1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i+1));
          let k = array[i];
          array[i] = array[j];
          array[j] = k;
        }

      }




}