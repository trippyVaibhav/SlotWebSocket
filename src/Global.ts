import { bonusGame } from "./BonusResults";
// import {  } from "./testData";
import { sendInitdata } from './SlotDataInit';
import { gameData } from "./testData";
import { GameSettings, PlayerData, WildSymbol, addScatterPay, convertSymbols, setJackpotSettings, setWild, winning } from "./utils";

// let gameSettings.currentGamedata={
//     id: "",
// linesApiData: [],
// Symbols: [
//     {
//         Name: "",
//         Id: null,
//         weightedRandomness: 0,
//         useWildSub: false,
//         multiplier: []
//     }]
// };

export const gameSettings: GameSettings = {
    currentGamedata:{
                id: "",
    linesApiData: [],
    Symbols: [
        {
            Name: "",
            Id: null,
            weightedRandomness: 0,
            useWildSub: false,
            multiplier: []
        }]
    },
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    bonusPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {} as WildSymbol,
    // Symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',"10","11","12"],
    // Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.01],
    Symbols: [],
    Weights: [],
    resultSymbolMatrix: [],
    lineData: [],
    fullPayTable: [],
    jackpot: {
        symbolName: 'Jackpot',
        symbolsCount: 6,
        defaultAmount: 1000,
        increaseValue: 1
    },
    bonus: {
        start: false,
        stopIndex: -1,
        game: null,
        // game: new bonusGame(5),
    },
    currentBet:5,
    initiate: (GameID: any, clientID: any)=>{
        const currentGameData=gameData.filter((element)=>element.id==GameID)
        // console.log(currentGameData);
        gameSettings.currentGamedata=currentGameData[0];
        // setCurrentData(currentGameData[0]);
        gameSettings.Symbols=initSymbols();
        gameSettings.Weights=initWeigts();
        UiInitData.paylines=convertSymbols(gameSettings.currentGamedata.Symbols);
        makePayLines();
        sendInitdata(clientID);

    }
};




function initSymbols(): string[] {
    let symbols: string[] = [];

    for (let i = 0; i < gameSettings?.currentGamedata.Symbols.length; i++) {
        symbols.push(gameSettings?.currentGamedata.Symbols[i].Id?.toString());

    }
    return symbols;
}

function initWeigts(): number[] {
    let weights: number[] = [];

    for (let i = 0; i < gameSettings?.currentGamedata.Symbols.length; i++) {
        weights.push(gameSettings.currentGamedata.Symbols[i]?.weightedRandomness);

    }

    return weights;
}

export const playerData: PlayerData = {
    Balance: 1000,
    haveWon: 0,
    // haveUsed: 0
}

export const UiInitData = {
    paylines: convertSymbols(gameSettings.currentGamedata.Symbols),
    spclSymbolTxt: [],
    AbtLogo: {
        logoSprite: "https://iili.io/JrMCqPf.png",
        link: "https://dingding-game.vercel.app/login",
    },
    ToULink: "https://dingding-game.vercel.app/login",
    PopLink: "https://dingding-game.vercel.app/login",
}

export let gameWining: winning = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: 0,
    currentBet: 0,
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

    // if(!UiInitData.paylines[parseInt(symbol)]) UiInitData.paylines[parseInt(symbol)]= []
    // UiInitData.paylines[parseInt(symbol)].push(pay?.toString());
    // console.log(gameSettings.payLine);
}


export function makePayLines() {

    gameSettings.currentGamedata.Symbols.forEach((element) => {
        if (element.Id < 10 && element.multiplier?.length > 0) {

            element.multiplier?.forEach((item, index) => {
                addPayLineSymbols(element.Id?.toString(), 5 - index, item[0], item[1]);
            })
        } else {
            handleSpecialSymbols(element);
            // addPayLineSymbols(element.Id?.toString(),3, 0,0);
        }
    })
    // addPayLineSymbols("0", 5, 0.1, 0);
    // addPayLineSymbols("0", 4, 0.3, 0);
    // addPayLineSymbols("0", 3, 0.5, 0);

    // addPayLineSymbols("1", 5, 0.1, 0);
    // addPayLineSymbols("1", 4, 0.3, 0);
    // addPayLineSymbols("1", 3, 0.5, 0);

    // addPayLineSymbols("2", 5, 0.1, 0);
    // addPayLineSymbols("2", 4, 0.3, 0);
    // addPayLineSymbols("2", 3, 0.5, 0);

    // addPayLineSymbols("3", 5, 0.1, 0);
    // addPayLineSymbols("3", 4, 0.3, 0);
    // addPayLineSymbols("3", 3, 0.5, 0);

    // addPayLineSymbols("4", 5, 0.1, 0);
    // addPayLineSymbols("4", 4, 0.3, 0);
    // addPayLineSymbols("4", 3, 0.5, 0);

    // addPayLineSymbols("5", 5, 0.1, 0);
    // addPayLineSymbols("5", 4, 0.3, 0);
    // addPayLineSymbols("5", 3, 0.5, 0);

    // addPayLineSymbols("6", 5, 0.1, 0);
    // addPayLineSymbols("6", 4, 0.3, 0);
    // addPayLineSymbols("6", 3, 0.5, 0);

    // addPayLineSymbols("7", 5, 0.1, 0);
    // addPayLineSymbols("7", 4, 0.3, 0);
    // addPayLineSymbols("7", 3, 0.5, 0);

    // addPayLineSymbols("8", 5, 0.1, 0);
    // addPayLineSymbols("8", 4, 0.3, 0);
    // addPayLineSymbols("8", 3, 0.5, 0);

    // addPayLineSymbols("9", 5, 0.1, 10);
    // addPayLineSymbols("9", 4, 0.3, 5);
    // addPayLineSymbols("9", 3, 0.5, 3);

    // setWild("Wild", 10);
    // addScatterPay(5, 11, 5, 0);
    // setJackpotSettings("Jackpot", 12, 50000, 5);
}


function handleSpecialSymbols(symbol) {

    switch (symbol.Name) {
        case "Jackpot":
            gameSettings.jackpot.symbolName = symbol.Name;
            gameSettings.jackpot.symbolsCount = symbol.Id;
            gameSettings.jackpot.defaultAmount = symbol.defaultAmount;
            gameSettings.jackpot.increaseValue = symbol.increaseValue;
            break;
        case "Wild":
            gameSettings.wildSymbol.SymbolName = symbol.Name;
            gameSettings.wildSymbol.SymbolID = symbol.Id;
            break
        case "Scatter":
            gameSettings.scatterPayTable.push({
                symbolCount: symbol.count,
                symbolID: symbol.Id,
                pay: symbol.pay,
                freeSpins: symbol.freeSpin
            });
            break;
        case "Bonus":
            gameSettings.bonusPayTable.push({
                    symbolCount: symbol.symbolCount,
                    symbolID: symbol.Id,
                    pay: symbol.pay,
                    highestPayMultiplier: symbol.highestMultiplier
                })
            break;
        default:
            break;
    }

}

// export function setJackpotSettings(symbolName: string, symbolID: number, defaultAmount: number, increaseValue: number): void {
//     gameSettings.jackpot.symbolName = symbolName;
//     gameSettings.jackpot.symbolsCount = symbolID;
//     gameSettings.jackpot.defaultAmount = defaultAmount;
//     gameSettings.jackpot.increaseValue = increaseValue;
// }

// // Function to set the Wild Symbol
// export function setWild(symbolName: string, symbol: number) {
//     gameSettings.wildSymbol.SymbolName = symbolName;
//     gameSettings.wildSymbol.SymbolID = symbol;
// }

// export function addScatterPay(symbolName: number, symbolID: number, pay: number, freeSpins: number): void {
//     gameSettings.scatterPayTable.push({
//     symbolCount: symbolName,
//     symbolID: symbolID,
//     pay: pay,
//     freeSpins: freeSpins
//     });
// }