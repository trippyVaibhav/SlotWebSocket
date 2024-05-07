// import { sendMessageToClient } from "./App";
import { sendMessageToClient } from "./App";
import { gameSettings} from "./Global";
import { linesApiData } from "./testData";
import { convertData, generateMatrix } from "./utils";


export function sendInitdata(clientID : string)
{
    const matrix = generateMatrix(gameSettings.matrix.x, 18);
    
    const dataToSend = {
        "Reel" :matrix,
        "Lines": linesApiData,
        "Bets": [1, 5, 10, 15, 20],
        "canSwitchLines": false,
        "LinesCount": [1, 5, 10, 15, 20],
        "autoSpin": [1, 5, 10, 20]
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

