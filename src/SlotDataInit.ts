import { sendMessageToClient } from "./App";
import { bonusGame } from "./BonusResults";
import { UiInitData, gameSettings, makePayLines, playerData} from "./Global";
import { linesApiData } from "./testData";
import { generateMatrix } from "./utils";

export function sendInitdata(clientID : string)
{
    makePayLines();
    const matrix = generateMatrix(gameSettings.matrix.x, 18);
    const bonus= gameSettings.bonus.game;

    for(let i = 0; i < 3; i++)
    {
        const strng = "Player has the right to start the slot machine without using their funds for a certain number of times. The size of the bet is determined by the";
        UiInitData.spclSymbolTxt.push(strng)
    }

    const dataToSend = {
       "GameData" : {
           "Reel" :matrix,
           "Lines": linesApiData,
           "Bets": [1, 5, 10, 15, 20],
           "canSwitchLines": false,
           "LinesCount": [1, 5, 10, 15, 20],
           "autoSpin": [1, 5, 10, 20],
        },
        "BonusData": bonus.generateData(gameSettings.bonusPayTable[0].pay),
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
            // matrix.pop();
            // matrix.pop();
            // matrix.pop();
            // matrix.push(['10','13','9','13','7'])
            // matrix.push(['13','10','13','9','8'])
            // matrix.push(['0','5','3','2','10'])

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

