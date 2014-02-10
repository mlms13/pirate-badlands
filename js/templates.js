var templates = [
    {
        height: 6,
        width: 6,
        startPos: {row: 4, col: 1},
        definedTiles: [
            {row: 4, col: 2, value: 3},
            {row: 3, col: 4, value: 3},
            {row: 0, col: 4, value: 3},
            {row: 1, col: 5, value: 1},
            {row: 1, col: 4, value: 1, points: 50},
            {row: 0, col: 5, value: 1, endGame: true}
        ]
    },
    {
        height: 6,
        width: 6,
        startPos: {row: 4, col: 0},
        definedTiles: [
            {row: 1, col: 1, value: 1},
            {row: 3, col: 1, value: 4},
            {row: 4, col: 1, value: 1},
            {row: 5, col: 1, value: 3},
            {row: 0, col: 2, value: 3},
            {row: 1, col: 2, value: 1, points: 20},
            {row: 4, col: 2, value: 6},
            {row: 2, col: 3, value: 3},
            {row: 1, col: 4, value: 2},
            {row: 1, col: 5, value: 1, endGame: true}
        ]
    },
    {
        height: 7,
        width: 7,
        startPos: {row: 3, col: 3},
        definedTiles: [
            {row: 1, col: 0, value: 2},
            {row: 5, col: 0, value: 6},
            {row: 0, col: 1, value: 2},
            {row: 3, col: 1, value: 3},
            {row: 1, col: 2, value: 4},
            {row: 3, col: 2, value: 6},
            {row: 4, col: 2, value: 2},
            {row: 2, col: 3, value: 1, points: 40},
            {row: 4, col: 3, value: 1},
            {row: 3, col: 4, value: 6},
            {row: 6, col: 4, value: 5},
            {row: 2, col: 5, value: 5},
            {row: 0, col: 0, value: 1, endGame: true}
        ]
    },
    {
        height: 8,
        width: 8,
        startPos: {row: 0, col: 0},
        definedTiles: [
            {row: 1, col: 0, value: 6},
            {row: 5, col: 1, value: 5},
            {row: 6, col: 1, value: 1, points: 15},
            {row: 7, col: 1, value: 4},
            {row: 1, col: 2, value: 4},
            {row: 6, col: 2, value: 8},
            {row: 7, col: 4, value: 6},
            {row: 2, col: 5, value: 2},
            {row: 4, col: 5, value: 4},
            {row: 3, col: 6, value: 1},
            {row: 4, col: 6, value: 3},
            {row: 7, col: 6, value: 6},
            {row: 6, col: 7, value: 1, endGame: true}
        ]
    },
    {
        height: 12,
        width: 12,
        startPos: {row: 5, col: 5},
        definedTiles: [
            // Inner land ring
            {row: 3, col: 6, value: -1},
            {row: 3, col: 5, value: -1},
            {row: 3, col: 4, value: -1},
            {row: 3, col: 3, value: -1},
            {row: 4, col: 3, value: -1},
            {row: 5, col: 3, value: -1},
            {row: 6, col: 3, value: -1},
            {row: 7, col: 3, value: -1},
            {row: 7, col: 4, value: -1},
            {row: 7, col: 5, value: -1},
            {row: 7, col: 6, value: -1},
            {row: 7, col: 7, value: -1},
            {row: 6, col: 7, value: -1},
            {row: 5, col: 7, value: -1},

            // Moves to get out of ring
            {row: 4, col: 5, value: 1},
            {row: 4, col: 4, value: 1},
            {row: 5, col: 4, value: 2},
            {row: 6, col: 5, value: 2},
            {row: 5, col: 6, value: 2},
            {row: 4, col: 7, value: 2},

            // Island on top right with flotsam
            {row: 0, col: 8, value: -1},
            {row: 0, col: 9, value: -1},
            {row: 0, col: 10, value: -1},
            {row: 0, col: 11, value: -1},
            {row: 1, col: 8, value: -1},
            {row: 1, col: 9, value: -1},
            {row: 1, col: 10, value: -1},
            {row: 1, col: 11, value: 1, points: 150},
            {row: 2, col: 8, value: -1},
            {row: 2, col: 9, value: -1},
            {row: 3, col: 9, value: -1},
            {row: 3, col: 11, value: -1},
            {row: 4, col: 11, value: -1},
            {row: 5, col: 10, value: -1},
            {row: 5, col: 11, value: -1},

            // Moves to get to flotsam from cove
            {row: 4, col: 9, value: 1},
            {row: 4, col: 10, value: 1},
            {row: 3, col: 10, value: 1},
            {row: 2, col: 10, value: 1},
            {row: 2, col: 11, value: 1},

            // Moves to get to booty
            {row: 5, col: 8, value: 7},
            {row: 11, col: 7, value: 3},
            {row: 10, col: 5, value: 3},
            {row: 8, col: 4, value: 2},
            {row: 9, col: 3, value: 2},
            {row: 9, col: 3, value: 2},
            {row: 10, col: 4, value: 4},
            {row: 9, col: 7, value: 1},
            {row: 9, col: 6, value: 5},
            {row: 10, col: 2, value: 2},
            {row: 11, col: 1, value: 2},
            {row: 10, col: 0, value: 9},
            {row: 2, col: 1, value: 2},
            {row: 3, col: 2, value: 6},
            {row: 8, col: 1, value: 1},
            {row: 7, col: 1, value: 7},
            {row: 1, col: 2, value: 3},
            {row: 1, col: 5, value: 2},
            {row: 0, col: 6, value: 1},
            {row: 0, col: 5, value: 6},

            // End Game
            {row: 0, col: 0, value: 1, endGame: true}
        ]
    }
];

module.exports = templates;