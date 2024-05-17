import { gameSettings,playerData  } from "./Global";

export class bonusGame{
    type:String;
    noOfItems:number;
    totalPay:number;
    result:string[];
    noise:number;
    minPay:number;
    maxPay:number;

    constructor(nosOfItem:number) {
        this.noOfItems=nosOfItem;
        this.type="default";
        this.result=[];
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
    
    generateData(totalPay:number ):string[] {
        this.result=[];
        let res=[];
        let sum = 0;
        this.totalPay=totalPay;

        this.maxPay=Math.floor(totalPay*0.5);
        let part=Math.floor((this.totalPay-this.maxPay)/(this.noOfItems-2));
        this.noise=Math.floor(part/(this.noOfItems-2));
        for (let i = 0; i < this.noOfItems-2; i++) {
                res.push(part);
                sum+=part;
        }

        for (let i = 0; i < res.length; i++) {
            let min=this.noise*i >0? this.noise*i: this.noise;
            let max=this.noise*(i+1);
            let j = res.length-1-i;
            let deviation=Math.floor(  Math.random()*(max -min) +min );
            res[i]-=deviation;
            res[j]+=deviation;
            
        }

        let diff=this.totalPay-this.maxPay-sum;
        res[Math.floor(Math.random()*res.length)]+=diff;
        res.push("-1");
        res.push(this.maxPay);
        this.shuffle(res);

        for (let i = 0; i < res.length; i++) {
            this.result.push(res[i].toString());
        }
        return this.result;
    }

    setRandomStopIndex(){
        if(gameSettings.bonus.type=="spin" && gameSettings.bonus.start)
            gameSettings.bonus.stopIndex=Math.round(Math.random()*this.noOfItems);
        let amount: number=parseFloat(this.result[gameSettings.bonus.stopIndex]);
        if(amount<0)
            amount=0
        playerData.Balance += amount;
        playerData.haveWon += amount;


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