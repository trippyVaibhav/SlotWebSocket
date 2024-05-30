//TODO : ADD ALL THE TYPES IN THIS FILE
import { bonusGame } from "./BonusResults";
import { GambleGame } from "./GambleResults";

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

export enum messageId{
    auth="Auth",
    spin="Spin",
    gamble="gamble"

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