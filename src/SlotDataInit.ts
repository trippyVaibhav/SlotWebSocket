import { sendMessageToClient } from "./App";
import { bonusGame } from "./BonusResults";
import { UiInitData, gameSettings, playerData} from "./Global";
import { bonusGameType, generateMatrix } from "./utils";

export function sendInitdata(clientID : string)
{
    let specialSymbols=[];
    const matrix = generateMatrix(gameSettings.matrix.x, 18);
    if(gameSettings.currentGamedata.bonus.isEnabled && gameSettings.currentGamedata.bonus.type==bonusGameType.spin)
    gameSettings.bonus.game= new bonusGame(gameSettings.currentGamedata.bonus.noOfItem);

    specialSymbols=gameSettings.currentGamedata.Symbols.filter((element)=>(!element.useWildSub))
    

    for(let i = 0; i < 1; i++)
    {
        const strng = "Player has the right to start the slot machine without using their funds for a certain number of times. The size of the bet is determined by the";
        UiInitData.spclSymbolTxt.push(strng)
    }
    specialSymbols=[];
    const dataToSend = {
       "GameData" : {
           "Reel" :matrix,
           "Lines": gameSettings.currentGamedata.linesApiData,
           "Bets": gameSettings.currentGamedata.bets,
           "canSwitchLines": false,
           "LinesCount": gameSettings.currentGamedata.linesCount,
           "autoSpin": [1, 5, 10, 20],
        },
        "BonusData": gameSettings.bonus.game!=null? gameSettings.bonus.game.generateData(gameSettings.bonusPayTable[0]?.pay):[],
        "UIData":  UiInitData,
        "PlayerData" : playerData,
        };

    sendMessageToClient(clientID,"InitData",dataToSend)
}


export class RandomResultGenerator {
    constructor()
    {
        // Generating a 3x5 matrix of random numbers based on weights
        const matrix: string[][] = [];
        for (let i = 0; i < gameSettings.matrix.y; i++) 
            {
                const row: string[] = [];
                for (let j = 0; j < gameSettings.matrix.x; j++) 
                {
                    const randomIndex: number = this.randomWeightedIndex(gameSettings.Weights);
                    row.push(gameSettings.Symbols[randomIndex]);
                }
                matrix.push(row);
            }

            matrix.pop();
            matrix.pop();
            matrix.pop();
            matrix.push(['0','2','0','3','0'])
            matrix.push(['5','0','1','0','5'])
            matrix.push(['8','8','8','8','8'])

            gameSettings.resultSymbolMatrix = matrix;
    }
    
    // Function to generate a random number based on weights
    randomWeightedIndex(weights: number[]): number {
        const totalWeight: number = weights.reduce((acc, val) => acc + val, 0);
        const randomNumber: number = Math.random() * totalWeight;
        let weightSum: number = 0;
        for (let i = 0; i < weights.length; i++) {
            weightSum += weights[i];
            if (randomNumber <= weightSum) {
                return i;
            }
        }
        // Default to last index if not found
        return weights.length - 1; 
    }
}

