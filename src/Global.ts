import { Symbols } from "./testData";
import { GameSettings, PlayerData, WildSymbol, addScatterPay, convertSymbols, setJackpotSettings, setWild, winning } from "./utils";

export const gameSettings: GameSettings = {
    matrix: { x: 5, y: 3 },
    payLine: [],
    scatterPayTable: [],
    useScatter: false,
    useWild: true,
    wildSymbol: {} as WildSymbol,
    // Symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',"10","11","12"],
    // Weights: [0.1, 0.1, 0.05, 0.05, 0.01, 0.1, 0.1, 0.1, 0.01, 0.01, 0.1, 0.01, 0.01],
    Symbols: initSymbols(),
    Weights: initWeigts(),
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

function initSymbols():string[]{
    let symbols:string[]=[];

    for (let i = 0; i < Symbols.length; i++) {
        symbols.push(Symbols[i].Id.toString());
        
    }
    return symbols;
}

function initWeigts():number[]{
    let weights:number[]=[];

    for (let i = 0; i < Symbols.length; i++) {
       weights.push(Symbols[i].weightedRandomness);
        
    }

    return weights;
}

export const playerData : PlayerData = {
    Balance :1000,
    haveWon :100,
}

export const UiInitData = {
    paylines : convertSymbols(Symbols) ,
    spclSymbolTxt : [],
    AbtLogo : {
        logoSprite : "https://iili.io/JrMCqPf.png",
        link : "https://dingding-game.vercel.app/login",
    },
    ToULink : "https://dingding-game.vercel.app/login",
    PopLink : "https://dingding-game.vercel.app/login",
}

export let gameWining: winning = {
    winningSymbols: undefined,
    WinningLines: undefined,
    TotalWinningAmount: 0,
    shouldFreeSpin: undefined,
    freeSpins: 0,
    currentBet : 0,
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
    // UiInitData.paylines[parseInt(symbol)].push(pay.toString());
    // console.log(gameSettings.payLine);
}


export function makePayLines() {

    Symbols.forEach((element)=>{
        if(element.multiplier!=null && element.multiplier.length>0){

            element.multiplier?.forEach((item)=>{
                addPayLineSymbols(element.Id.toString(),item.reps, item.value,item.freeSpin);

            })
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

    setWild("Wild", 10);
    addScatterPay(5, 11, 5, 0);
    setJackpotSettings("Jackpot", 12, 50000, 5);
}
