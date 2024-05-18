import { gameData } from "./testData";
import { gameSettings } from "./Global";

export function conrtolWeights(haveWon: number, haveUsed: number ){

if(haveWon==0)
    return;

if(haveWon<haveUsed){
    gameSettings.currentGamedata.Symbols.forEach((element)=>{
        if(element?.Id> 10){
            // element.weightedRandomness+=(haveWon/haveUsed)
            // console.log("changed weight:",(haveWon/haveUsed));
        }

    })
}


}