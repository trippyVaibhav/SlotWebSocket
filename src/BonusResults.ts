import { gameSettings,playerData  } from "./Global";

export class bonusGame{
    type:String;
    noOfItems:number;
    totalPay:number;
    result:number[];
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
        console.log("triggered12");
 
        this.result=[];
        let res: string[]=[];
        let sum = 0;
        this.totalPay=totalPay;
        this.maxPay=Math.floor(totalPay*0.5);
        let part=Math.floor((this.totalPay-this.maxPay)/(this.noOfItems-2));

        this.noise=Math.floor(part/(this.noOfItems-2));

        for (let i = 0; i < this.noOfItems-2; i++) {
                this.result.push(part);
                sum+=part;
        }

        for (let i = 0; i < this.result.length; i++) {
            let min=this.noise*i >0? this.noise*i: this.noise;
            let max=this.noise*(i+1);
            let j = this.result.length-1-i;
            let deviation=Math.floor(  Math.random()*(max -min) +min );
            this.result[i]-=deviation;
            this.result[j]+=deviation;
            
        }

        let diff=this.totalPay-this.maxPay-sum;
        this.result[Math.floor(Math.random()*res.length)]+=diff;
        this.result.push(-1);
        this.result.push(this.maxPay);
        this.shuffle(this.result);

        for (let i = 0; i < this.result.length; i++) {
            res.push(this.result[i].toString());
        }

        console.log("result of bonus", res);
        return res;
    }

    setRandomStopIndex(){
        console.log("triggered23");
        let amount: number;

        if(gameSettings.bonus.start && gameSettings.currentGamedata.bonus.type=="spin"){
            gameSettings.bonus.stopIndex=Math.round(Math.random()*this.noOfItems);
            amount=this.result[gameSettings.bonus.stopIndex];
        }

        if(gameSettings.bonus.start && gameSettings.currentGamedata.bonus.type=="tap"){
            gameSettings.bonus.stopIndex=-1;   
            this.result.forEach((element)=>{
                if(element>=0){
                    amount+=element;
                }
            }) 
        }

        if(!amount || amount<0)
            amount=0

        playerData.Balance += amount;
        playerData.haveWon += amount;


    }

    shuffle(array:number[]) {
        for (let i = array.length -1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i+1));
          let k = array[i];
          array[i] = array[j];
          array[j] = k;
        }

      }




}