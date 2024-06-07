import { gameSettings,playerData  } from "./Global";
import { bonusGameType } from "./utils";

export class bonusGame{
    type:String;
    noOfItems:number;
    totalPay:number;
    result:number[];
    noise:number;
    minPay:number;
    maxPay:number;
    clientId: string;

    constructor(nosOfItem:number, clientId: string) {
        this.noOfItems=nosOfItem;
        this.type= bonusGameType.default;
        this.result=[];
        this.clientId=clientId
        // this.noise=noise;
    }

    
    generateData(totalPay:number ):string[] {
 
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

        return res;
    }

    generateSlotData(reps:number =0){
        let res: string[]=[];


        let slot_array: number[]=[];
        let multiplier_array: number[]=[];
        // for (let index = 0; index < 3; index++) {
        //     slot_array.push(Math.floor(Math.random()*12));
            
        // }

        slot_array.push(1);
        slot_array.push(2);
        slot_array.push(1);

    //    let reelNum: number=Math.floor(Math.random()*12);
       let reelNum: number=1;


       
        if(!slot_array.includes(reelNum)){
            reelNum=-1;
        }

       slot_array.forEach((element)=>{
        if(element===reelNum)
            multiplier_array.push(gameSettings.currentGamedata.bonus.payTable[element]);
        else 
            multiplier_array.push(0);
       })

      
        this.result=[...slot_array,reelNum,...multiplier_array];

        for (let i = 0; i < this.result.length; i++) {
            res.push(this.result[i].toString());
        }
        return res;
    }

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

    setRandomStopIndex(){
        let amount: number=0;

        if(gameSettings.bonus.start && gameSettings.currentGamedata.bonus.type==bonusGameType.spin){
            gameSettings.bonus.stopIndex=Math.round(Math.random()*this.noOfItems);
            amount=this.result[gameSettings.bonus.stopIndex];
        }else if(gameSettings.bonus.start && gameSettings.currentGamedata.bonus.type==bonusGameType.tap){
            gameSettings.bonus.stopIndex=-1;   
            this.result.forEach((element)=>{
                if(element>=0){
                    amount+=element;
                }
            }) 
        }else if(gameSettings.bonus.start && gameSettings.currentGamedata.bonus.type=="slot"){
            gameSettings.bonus.stopIndex=-1;
            for (let index = 1; index < 4; index++) {
                amount+=gameSettings.currentBet*this.result[this.result.length-index];
                
            }   
            // amount=gameSettings.currentBet*this.result[this.result.length-1];
            console.log("amount",amount);
            console.log("current bet",gameSettings.currentBet);
        }

        if(!amount || amount<0)
            amount=0
        gameSettings.bonus.stopIndex = -1;
        return amount;

        
        // playerData.Balance += amount;
        // playerData.haveWon += amount;
        // playerData.currentWining=amount;
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