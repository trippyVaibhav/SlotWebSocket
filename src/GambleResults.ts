import { gameSettings,playerData  } from "./Global";
import { bonusGameType } from "./utils";
import { sendMessageToClient } from "./App";


export class GambleGame{
    type:String;
    clientId: string;
    initialBet: number;
    totalWining: number;
    multiplier: number;
    gambleCount: number;
    maxgambleCount: number;

    constructor(clientId: string,initaialBet: number, multiplier:number=2) {

        this.clientId=clientId
        this.multiplier=multiplier;
        this.gambleCount=0;
        this.totalWining=0;
        this.maxgambleCount=5;
        this.initialBet=initaialBet;
        this.totalWining=initaialBet;
       
    }

    
    generateData(gambleAmount:number ) {
        console.log("triggered in gamble");

        const num=Math.random();
        if(this.gambleCount>0){
            // gambleAmount=this.currentWining;
            this.totalWining*= this.multiplier;
        }

        if(num>0.5){
            // gambleAmount*= this.multiplier;
            this.totalWining*= this.multiplier;
        }else{
            // gambleAmount=0;
            this.totalWining=0;
            gameSettings.gamble.start=false;
            // return;
        }
        // this.currentWining*= this.multiplier;
        // gambleAmount*=0;
        // this.currentWining=gambleAmount;
        // this.totalWining=this.currentWining;
        this.makeResultJson(this.clientId);
        // this.gambleCount++;
        console.log("gamble amount",this.gambleCount);
    }


    makeResultJson(clientId:string) {
        // const totalWinningAmount = (Math.round(amount * 100) / 100)
        console.log("triggered in make resultjson");

        const ResultData = {
            "GambleData": {
                totalWinningAmount: this.totalWining

            },
            "PlayerData": playerData,
        }
        sendMessageToClient(clientId, "GambleResult", ResultData);
    }

    updateplayerBalance(){
        
        if(this.totalWining>0){
            // playerData.Balance+=(this.totalWining - this.initialBet);
            // playerData.haveWon+=(this.totalWining - this.initialBet);
            playerData.Balance+=(this.totalWining );
            playerData.haveWon+=(this.totalWining );
            playerData.currentWining=this.totalWining;

        }
        else{
            playerData.Balance-=this.initialBet;
            playerData.haveWon-=this.initialBet;
            playerData.currentWining=0;
        }

        this.makeResultJson(this.clientId);
    }

    reset(){
        this.gambleCount=0;
        this.totalWining=0;
        this.initialBet=0;
        gameSettings.gamble.game=null;
        gameSettings.gamble.start=false;
    }

    checkIfClientExist(clients: Map<string, WebSocket>){
        if(clients.has(this.clientId))
            return true;
        else
        return false;
    }
}