export interface SymbolData {
    symbolName: string
    symbolID: number,
    useWildSub: boolean,
}

// Define interfaces for pay lines and scatter pay table entries
interface PayLine {
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

export const gameSettings: GameSettings = {
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {} as WildSymbol,
    Symbols: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01],
    resultSymbolMatrix: [],
    lineData: [],
    fullPayTable: [],
    jackpot: {
        symbolName: 'Jackpot',
        symbolsCount: 6,
        defaultAmount: 1000,
        increaseValue: 1
    }
};
interface winning {
    winningSymbols: any[],
    WinningLines: any[],
    TotalWinningAmount: number,
    shouldFreeSpin: boolean,
    freeSpins: number,
    currentBet : number
};

export let gameWining: winning = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: null,
    currentBet : null,
}

export function addPayLineSymbols(symbol: string, repetition: number, pay: number, freeSpins: number): void {
    const line: string[] = Array(repetition).fill(symbol); // Create an array with 'repetition' number of 'symbol'

    if (line.length != gameSettings.matrix.x) {
        let lengthToAdd = gameSettings.matrix.x - line.length;
        for (let i = 0; i < lengthToAdd; i++)
            line.push("any");
    }

    gameSettings.payLine.push({
        line: line,
        pay: pay,
        freeSpins: freeSpins
    });
    // console.log(gameSettings.payLine);

}


export function removeDuplicateArrays(arrayOfArrays: string[][]): string[][] {
    let uniqueArrays: string[][] = [];
    let seen: Set<string> = new Set();
  
    arrayOfArrays.forEach(subArray => {
      let subArrayString = JSON.stringify(subArray); // Convert sub-array to string for comparison
      if (!seen.has(subArrayString)) {
        uniqueArrays.push(subArray);
        seen.add(subArrayString);
      }
    });
  
    return uniqueArrays;
  }
export function makePayLines() {
    addPayLineSymbols("0", 5, 0.1, 0);
    addPayLineSymbols("0", 4, 0.3, 0);
    addPayLineSymbols("0", 3, 0.5, 0);

    addPayLineSymbols("1", 5, 0.1, 0);
    addPayLineSymbols("1", 4, 0.3, 0);
    addPayLineSymbols("1", 3, 0.5, 0);

    addPayLineSymbols("2", 5, 0.1, 0);
    addPayLineSymbols("2", 4, 0.3, 0);
    addPayLineSymbols("2", 3, 0.5, 0);

    addPayLineSymbols("3", 5, 0.1, 0);
    addPayLineSymbols("3", 4, 0.3, 0);
    addPayLineSymbols("3", 3, 0.5, 0);

    addPayLineSymbols("4", 5, 0.1, 0);
    addPayLineSymbols("4", 4, 0.3, 0);
    addPayLineSymbols("4", 3, 0.5, 0);

    addPayLineSymbols("5", 5, 0.1, 0);
    addPayLineSymbols("5", 4, 0.3, 0);
    addPayLineSymbols("5", 3, 0.5, 0);

    addPayLineSymbols("6", 5, 0.1, 0);
    addPayLineSymbols("6", 4, 0.3, 0);
    addPayLineSymbols("6", 3, 0.5, 0);

    addPayLineSymbols("7", 5, 0.1, 0);
    addPayLineSymbols("7", 4, 0.3, 0);
    addPayLineSymbols("7", 3, 0.5, 0);

    addPayLineSymbols("8", 5, 0.1, 0);
    addPayLineSymbols("8", 4, 0.3, 0);
    addPayLineSymbols("8", 3, 0.5, 0);

    addPayLineSymbols("9", 5, 0.1, 0);
    addPayLineSymbols("9", 4, 0.3, 0);
    addPayLineSymbols("9", 3, 0.5, 0);

    setWild("Wild", 10);
    addScatterPay(5, 11, 5, 0);
    setJackpotSettings("Jackpot", 12, 50, 5);
}

// Function to add a scatter pay table entry to the game settings
export function addScatterPay(symbolName: number, symbolID: number, pay: number, freeSpins: number): void {
    gameSettings.scatterPayTable.push({
        symbolCount: symbolName,
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

// // Example usage:
// addPayLine('Wick', 5, 3, 0); // 'Wick' symbol repeated 5 times
// addScatterPay(5, 0, 5);
// setJackpotSettings('MyJackpot', 6, 1000, 1);