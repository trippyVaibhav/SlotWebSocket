import { gameSettings } from "./Global";

export interface SymbolData {
    symbolName: string
    symbolID: number,
    useWildSub: boolean,
    multiplier : number[],
    freespins : number
}
export interface PlayerData {
    Balance : number,
    haveWon : number,
}
// Define interfaces for pay lines and scatter pay table entries
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
    matrix: { x: number, y: number }
    payLine: PayLine[];
    scatterPayTable: ScatterPayEntry[];
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
        symbolsCount: number;
        defaultAmount: number;
        increaseValue: number;
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

// Function to add a scatter pay table entry to the game settings
export function addScatterPay(symbolCount: number, symbolID: number, pay: number, freeSpins: number): void {
    gameSettings.scatterPayTable.push({
    symbolCount: symbolCount,
    symbolID: symbolID,
    pay: pay,
    freeSpins: freeSpins
    });
}

// Function to set the jackpot settings
export function setJackpotSettings(symbolName: string, symbolID: number, defaultAmount: number, increaseValue: number): void {
    gameSettings.jackpot.symbolName = symbolName;
    gameSettings.jackpot.symbolsCount = symbolID;
    gameSettings.jackpot.defaultAmount = defaultAmount;
    gameSettings.jackpot.increaseValue = increaseValue;
}

// Function to set the Wild Symbol
export function setWild(symbolName: string, symbol: number) {
    gameSettings.wildSymbol.SymbolName = symbolName;
    gameSettings.wildSymbol.SymbolID = symbol;
}

export function convertSymbols(data) {
    const convertedData = data.map(symbol => {
      if (symbol.multiplier) {
        const multiplierObject = {};
        multiplierObject['5x'] = symbol.multiplier[0];
        multiplierObject['4x'] = symbol.multiplier[1];
        multiplierObject['3x'] = symbol.multiplier[2];
        
        return {
          ID: symbol.ID,
          multiplier: multiplierObject
        };
      } else {
        return null; // Exclude symbols without multipliers
      }
    }).filter(symbol => symbol !== null); // Remove null values
    
    return { symbols: convertedData };
  }