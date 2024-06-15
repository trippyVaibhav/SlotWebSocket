import { spec } from "node:test/reporters";
import { sendMessageToClient } from "./App";
import { bonusGame } from "./BonusResults";
import { UiInitData, gameSettings, playerData } from "./Global";
import { bonusGameType, generateMatrix, shuffleArray } from "./utils";
import { PayLines } from "./SlotResult";

export function sendInitdata(clientID: string) {

    // const matrix = generateMatrix(gameSettings.matrix.x, 18);
    gameSettings.reels=generateInitialreel();

    if (gameSettings.currentGamedata.bonus.isEnabled && gameSettings.currentGamedata.bonus.type == bonusGameType.spin)
        gameSettings.bonus.game = new bonusGame(gameSettings.currentGamedata.bonus.noOfItem, clientID);

    let specialSymbols = gameSettings.currentGamedata.Symbols.filter((element) => (!element.useWildSub))


    for (let i = 0; i < specialSymbols.length; i++) {
        const strng = "Player has the right to start the slot machine without using their funds for a certain number of times. The size of the bet is determined by the";
        UiInitData.spclSymbolTxt.push(strng)
    }

    const dataToSend = {
        "GameData": {
            "Reel": gameSettings.reels,
            "Lines": gameSettings.currentGamedata.linesApiData,
            "Bets": gameSettings.currentGamedata.bets,
            "canSwitchLines": false,
            "LinesCount": gameSettings.currentGamedata.linesCount,
            "autoSpin": [1, 5, 10, 20],
        },
        "BonusData": gameSettings.bonus.game != null ? gameSettings.bonus.game.generateData(gameSettings.bonusPayTable[0]?.pay) : [],
        "UIData": UiInitData,
        "PlayerData": playerData,
    };

    sendMessageToClient(clientID, "InitData", dataToSend)
}


export class RandomResultGenerator {
    constructor() {

        let matrix: string[][] = [];
        let randomIndexArray=[];
            for (let j = 0; j < gameSettings.matrix.y; j++) {
                let row:string[] = []
                for (let i = 0; i < gameSettings.matrix.x; i++) {
                    if(j==0){
                        let rowrandomIndex=Math.floor(Math.random() * ((gameSettings.reels[i].length - 1) - 0)) + 0;
                        randomIndexArray.push(rowrandomIndex) ;
                        row.push(gameSettings.reels[i][rowrandomIndex].toString());
                    }else{
                        if(randomIndexArray[i]==0)
                        row.push(gameSettings.reels[i][randomIndexArray[i]+j].toString());
                        else if(randomIndexArray[i]==gameSettings.reels[i].length-1)
                        row.push(gameSettings.reels[i][randomIndexArray[i]-j].toString());
                        else if(randomIndexArray[i]<=gameSettings.matrix.y)
                        row.push(gameSettings.reels[i][randomIndexArray[i]+j].toString());
                        else if(randomIndexArray[i]>gameSettings.matrix.y)
                        row.push(gameSettings.reels[i][randomIndexArray[i]-j].toString());
                    }

                }
                matrix.push(row);
            }
        console.log("indexs",randomIndexArray);


        // matrix.pop();
        // matrix.pop();
        // matrix.pop();
        // matrix.push(['1', '1', '1', '1', '1'])
        // matrix.push(['3', '2', '0', '1', '5'])
        // matrix.push(['3', '0', '4', '4', '3'])

        gameSettings.resultSymbolMatrix = matrix;
        gameDataInit();
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

function gameDataInit() {
    gameSettings.lineData = gameSettings.currentGamedata.linesApiData;
    // gameSettings.bonus.start = false;
    makeFullPayTable();
}

function generateInitialreel():string[][] {

    let matrix:string[][]=[]
    for (let i = 0; i < gameSettings.matrix.x; i++) {
        let reel: string[] = [];

        gameSettings.currentGamedata.Symbols.forEach(element => {

            for (let j = 0; j < element.reelInstance[i]; j++) {
                reel.push(element.Id.toString());
            }
        })

        shuffleArray(reel); 
        matrix.push(reel);
    }
    return matrix;
}


function makeFullPayTable() {
    let payTable: PayLines[] = [];
    let payTableFull = [];

    gameSettings.payLine.forEach((pLine) => {
        payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, gameSettings.wildSymbol.SymbolName))
    })

    for (let j = 0; j < payTable.length; j++) {
        payTableFull.push(payTable[j]);

        if (gameSettings.useWild) {
            let wildLines = payTable[j].getWildLines();
            wildLines.forEach((wl) => { payTableFull.push(wl); });
        }
    }
    gameSettings.fullPayTable = payTableFull;
    // let payTable: any[] = [];
    // let payTableFull = [];

    // if (gameSettings.useWild) {
    //     gameSettings.payLine.forEach((pLine) => {
    //         payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, gameSettings.wildSymbol.SymbolID.toString()))
    //     })
    // } else {
    //     gameSettings.currentGamedata.Symbols.forEach((element)=>{
    //         if(element.useWildSub || element.multiplier?.length>0){
    //             gameSettings.payLine.forEach((pLine) => {
    //                 payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, element.Id.toString()))
    //             })
    //         }
    //     })

    //     // payTable = gameSettings.payLine;
    // }


    // for (let j = 0; j < payTable.length; j++) {
    //     payTableFull.push(payTable[j]);
    //     let wildLines;
    //     if (gameSettings.useWild){
    //         wildLines = payTable[j].getWildLines();
    //         gameSettings.payLine.forEach((pLine) => {
    //             payTable.push(new PayLines(pLine.line, pLine.pay, pLine.freeSpins, gameSettings.wildSymbol.SymbolID.toString()))
    //         })
    //     }
    // }

    // console.log("full paytable", payTableFull);
    // gameSettings.fullPayTable = payTableFull;
}