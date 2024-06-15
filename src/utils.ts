import { bonusGame } from "./BonusResults";
import { GambleGame } from "./GambleResults";
import { gameSettings } from "./Global";

export interface SymbolData {
    symbolName: string
    symbolID: number,
    useWildSub: boolean,
    multiplier : number[],
    freespins : number
}

export enum messageId{
    auth="Auth",
    spin="Spin"

}

export enum specialIcons{
    bonus="Bonus",
    scatter="Scatter",
    jackpot="Jackpot",
    wild="Wild",
    any="any"
}

export enum bonusGameType{
    tap="tap",
    spin="spin",
    default = "default"
}
export interface PlayerData {
    Balance : number,
    haveWon : number,
    currentWining: number,
    // haveUsed: number
}
export interface PayLine {
    line: string[];
    pay: number;
    freeSpins: number;
}
export interface ScatterPayEntry {
    symbolCount: number,
    symbolID: number,
    pay: number;
    freeSpins: number;
}
export interface BonusPayEntry {
    symbolCount: number,
    symbolID: number,
    pay: number,
    highestPayMultiplier: number;
}

export interface WildSymbol {
    SymbolName: string,
    SymbolID: number,
}

export interface WeightedItem<T> {
    item: T;
    index: number;
}
export interface winning {
    winningSymbols: any[],
    WinningLines: any[],
    TotalWinningAmount: number,
    shouldFreeSpin: boolean,
    freeSpins: number,
    currentBet : number
};

export interface GameSettings {
    currentGamedata: any;
    matrix: { x: number, y: number }
    payLine: PayLine[];
    scatterPayTable: ScatterPayEntry[];
    bonusPayTable: BonusPayEntry[]
    useScatter: boolean,
    useWild: boolean
    Symbols: string[],
    Weights: number[],
    wildSymbol: WildSymbol,
    resultSymbolMatrix: string[][] | undefined,
    lineData: number[][],
    fullPayTable: PayLine[],
    jackpot: {
        symbolName: string;
        symbolId: number;
        symbolsCount: number;
        defaultAmount: number;
        increaseValue: number;
    },
    bonus:{
        game: bonusGame,
        start:boolean,
        stopIndex:number
        // maxPay: number
    },
    currentBet: number;
    startGame: boolean;
    initiate:(arg: string, arg2: string)=> void;
    gamble: {
        game: GambleGame,
        maxCount: number,
        start: boolean
    };

};

export function weightedRandom<T>(items: T[], weights: number[]): WeightedItem<T> {
    if (items.length !== weights.length) {
        throw new Error('Items and weights must be of the same size');
    }
    if (!items.length) {
        throw new Error('Items must not be empty');
    }
    // Preparing the cumulative weights array.
    const cumulativeWeights: number[] = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }
    // Getting the random number in a range of [0...sum(weights)]
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();
    // Picking the random item based on its weight.
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
            return {
                item: items[itemIndex],
                index: itemIndex,
            };
        }
    }
    // This should not happen if the weights are correctly defined,
    // but if we get here, return the last item.
    return {
        item: items[items.length - 1],
        index: items.length - 1,
    };
}

// Function to generate a 5x18 matrix of randomly selected items based on weights
export function generateMatrix(n_Rows : number, n_Columns : number): any[][] {
    const matrix: any[][] = [];
    for (let i = 0; i < n_Rows; i++) {
        const row: any[] = [];
        for (let j = 0; j < n_Columns; j++) {
            const result = weightedRandom(gameSettings.Symbols, gameSettings.Weights);
            row.push(result.item);
        }
        matrix.push(row);
    }
    // console.log(matrix);
    return matrix;
}

export function convertData(data: string[][]): string[] {
    const result: string[] = [];
    for (const row of data) {
        const convertedRow = Array.from(Array(row.length + 1).keys()).join(",");
        result.push(`"${convertedRow}"`);
    }
    return result;
}

export function shuffleArray(array:any[]) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = array[i];
      array[i] = array[j];
      array[j] = k;
    }

  }

export function convertSymbols(data) {

    let uiData={
        symbols:[]
    }
    
    data.forEach((element) => {
        if(  element.useWildSub || (!element.useWildSub && element.multiplier?.length>0)){

            let symbolData={
                ID: element.Id,
                multiplier: {}
              }
            const multiplierObject = {};
            element.multiplier.forEach((item, index )=> {
            multiplierObject[(5-index).toString()+'x'] = item[0];
             });
        symbolData.multiplier=multiplierObject;
        uiData.symbols.push(symbolData);
        }

    });


    // const convertedData = data.map(symbol => {
    //   if (symbol.multiplier?.length>0 && symbol.useWildSub) {


    //     const multiplierObject = {};
    //     multiplierObject['5x'] = symbol.multiplier[0][0];
    //     multiplierObject['4x'] = symbol.multiplier[1][0];
    //     multiplierObject['3x'] = symbol.multiplier[2][0];
        

    //     return {
    //       ID: symbol.Id,
    //       multiplier: multiplierObject
    //     };
    //   } else {
    //     return null; // Exclude symbols without multipliers
    //   }
    // }).filter(symbol => symbol !== null); // Remove null values

    // console.log("converted data",{ symbols: convertedData });
    
    // return { symbols: convertedData };
    return uiData;
  }