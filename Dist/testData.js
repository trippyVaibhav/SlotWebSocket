"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameData = exports.currentGameData = exports.setCurrentData = void 0;
function setCurrentData(obj) {
    exports.currentGameData = obj;
}
exports.setCurrentData = setCurrentData;
exports.currentGameData = {
    id: "",
    linesApiData: [],
    Symbols: [
        {
            Name: "",
            Id: null,
            weightedRandomness: 0,
            useWildSub: false,
            multiplier: []
        }
    ]
};
exports.gameData = [{
        id: "SL-GF",
        linesApiData: [
            [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
            [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1],
            [1, 0, 1, 2, 1], [0, 1, 1, 1, 0], [2, 1, 1, 1, 2], [0, 1, 0, 1, 0], [2, 1, 2, 1, 2],
            [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 0, 1, 0, 0], [2, 2, 0, 2, 2], [0, 2, 2, 2, 0],
        ],
        LinesCount: [1, 5, 15, 20],
        Bets: [1, 5, 15, 20],
        bonus: {
            type: "tap",
            isEnabled: false
        },
        gamble: {
            type: "card",
            isEnabled: false
        },
        Symbols: [
            {
                Name: "0",
                Id: 0,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "1",
                Id: 1,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            }, {
                Name: "2",
                Id: 2,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "3",
                Id: 3,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "4",
                Id: 4,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "5",
                Id: 5,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "6",
                Id: 6,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "7",
                Id: 7,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "8",
                Id: 8,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "Wild",
                Id: 9,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]]
            },
            {
                Name: "Scatter",
                Id: 10,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: []
            }
        ]
    },
    {
        id: "SL-VIK",
        linesApiData: [
            [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
            [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1],
            [1, 0, 1, 2, 1], [0, 1, 1, 1, 0], [2, 1, 1, 1, 2], [0, 1, 0, 1, 0], [2, 1, 2, 1, 2],
            [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 0, 1, 0, 0], [2, 2, 0, 2, 2], [0, 2, 2, 2, 0],
        ],
        LinesCount: [1, 5, 15, 20],
        Bets: [1, 5, 15, 20],
        bonus: {
            type: "spin",
            isEnabled: true
        },
        gamble: {
            type: "card",
            isEnabled: false
        },
        Symbols: [
            {
                Name: "0",
                Id: 0,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                // multiplier : [[0.5,0],[0.3,0],[0.1,0]]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "1",
                Id: 1,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            }, {
                Name: "2",
                Id: 2,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "3",
                Id: 3,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "4",
                Id: 4,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "5",
                Id: 5,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "6",
                Id: 6,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "7",
                Id: 7,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "8",
                Id: 8,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "9",
                Id: 9,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]]
            },
            {
                Name: "Wild",
                Id: 10,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: []
            },
            {
                Name: "Scatter",
                Id: 11,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [],
                pay: 5,
                freeSpin: 0,
                count: 5
            },
            {
                Name: "Jackpot",
                Id: 12,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [],
                defaultAmount: 12000,
                increaseValue: 5
            },
            {
                Name: "Bonus",
                Id: 13,
                weightedRandomness: 0.1,
                useWildSub: false,
                symbolCount: 5,
                pay: 1000,
                highestMultiplier: 0.5
            }
        ]
    },
    {
        id: "SL-MAF",
        linesApiData: [
            [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
            [2, 2, 1, 2, 2], [0, 0, 1, 0, 0], [1, 2, 2, 2, 1], [1, 0, 0, 0, 1]
        ],
        linesCount: [1, 3, 9, 6],
        bets: [1, 3, 9, 6],
        bonus: {
            type: "tap",
            isEnabled: true
        },
        gamble: {
            type: "card",
            isEnabled: false
        },
        Symbols: [
            {
                Name: "0",
                Id: 0,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                // multiplier : [[0.5,0],[0.3,0],[0.1,0]]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "1",
                Id: 1,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            }, {
                Name: "2",
                Id: 2,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "3",
                Id: 3,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "4",
                Id: 4,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "6",
                Id: 6,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "7",
                Id: 7,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "Bonus",
                Id: 8,
                weightedRandomness: 0.5,
                useWildSub: false,
                symbolCount: 5,
                pay: 100,
                highestMultiplier: 0.5
            },
            {
                Name: "Wild",
                Id: 9,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]]
            },
            {
                Name: "Scatter",
                Id: 10,
                weightedRandomness: 0.5,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]],
                pay: 5,
                freeSpin: 0,
                count: 5
            },
            {
                Name: "Jackpot",
                Id: 11,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [],
                defaultAmount: 12000,
                increaseValue: 5
            }
        ]
    },
    {
        id: "SL-FISH",
        linesApiData: [
            [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
            [2, 2, 1, 2, 2], [0, 0, 1, 0, 0], [1, 2, 2, 2, 1], [1, 0, 0, 0, 1], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1],
            [1, 0, 1, 2, 1]
        ],
        linesCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        bets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        bonus: {
            type: "tap",
            isEnabled: true
        },
        gamble: {
            type: "card",
            isEnabled: false
        },
        Symbols: [
            {
                Name: "0",
                Id: 0,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                // multiplier : [[0.5,0],[0.3,0],[0.1,0]]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "1",
                Id: 1,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            }, {
                Name: "2",
                Id: 2,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "3",
                Id: 3,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "4",
                Id: 4,
                weightedRandomness: 0.11,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "5",
                Id: 5,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "6",
                Id: 6,
                weightedRandomness: 0.05,
                useWildSub: true,
                // multiplier : [0.5,0.3,0.1]
                multiplier: [[0.5, 0], [0.3, 0], [0.1, 0]]
            },
            {
                Name: "Bonus",
                Id: 8,
                weightedRandomness: 0.5,
                useWildSub: false,
                symbolCount: 5,
                pay: 1000,
                highestMultiplier: 0.5
            },
            {
                Name: "Wild",
                Id: 9,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]]
            },
            {
                Name: "Scatter",
                Id: 7,
                weightedRandomness: 0.5,
                useWildSub: false,
                multiplier: [[0.5, 10], [0.3, 5], [0.1, 3]],
                pay: 5,
                freeSpin: 0,
                count: 5
            },
            {
                Name: "Jackpot",
                Id: 10,
                weightedRandomness: 0.05,
                useWildSub: false,
                multiplier: [],
                defaultAmount: 12000,
                increaseValue: 5
            }
        ]
    }
];
