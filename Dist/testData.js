"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbols = exports.linesApiData = exports.gameData = void 0;
exports.gameData = {
    linesApiData: [
        [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
        [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1],
        [1, 0, 1, 2, 1], [0, 1, 1, 1, 0], [2, 1, 1, 1, 2], [0, 1, 0, 1, 0], [2, 1, 2, 1, 2],
        [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 0, 1, 0, 0], [2, 2, 0, 2, 2], [0, 2, 2, 2, 0],
    ],
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
};
exports.linesApiData = [
    [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2],
    [1, 0, 1, 0, 1], [1, 2, 1, 2, 1], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [1, 2, 1, 0, 1],
    [1, 0, 1, 2, 1], [0, 1, 1, 1, 0], [2, 1, 1, 1, 2], [0, 1, 0, 1, 0], [2, 1, 2, 1, 2],
    [1, 1, 0, 1, 1], [1, 1, 2, 1, 1], [0, 0, 1, 0, 0], [2, 2, 0, 2, 2], [0, 2, 2, 2, 0],
];
exports.Symbols = [
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
];
