var templates = [
    {
        height: 6,
        width: 6,
        startPos: {row: 4, col: 1},
        definedTiles: [
            {row: 4, col: 2, visited: false, value: 3},
            {row: 3, col: 4, visited: false, value: 3},
            {row: 0, col: 4, visited: false, value: 3},
            {row: 1, col: 5, visited: false, value: 1},
            {row: 1, col: 4, visited: false, value: 1, points: 50},
            {row: 0, col: 5, visited: false, value: 1, endGame: true}
        ]
    },
    {
        height: 6,
        width: 6,
        startPos: {row: 4, col: 0},
        definedTiles: [
            {row: 1, col: 1, visited: false, value: 1},
            {row: 3, col: 1, visited: false, value: 4},
            {row: 4, col: 1, visited: false, value: 1},
            {row: 5, col: 1, visited: false, value: 3},
            {row: 0, col: 2, visited: false, value: 3},
            {row: 1, col: 2, visited: false, value: 4},
            {row: 4, col: 2, visited: false, value: 6},
            {row: 2, col: 3, visited: false, value: 3},
            {row: 1, col: 4, visited: false, value: 2},
            {row: 1, col: 5, visited: false, value: 1, endGame: true}
        ]
    },
    {
        height: 7,
        width: 7,
        startPos: {row: 3, col: 3},
        definedTiles: [
            {row: 1, col: 0, visited: false, value: 2},
            {row: 5, col: 0, visited: false, value: 6},
            {row: 0, col: 1, visited: false, value: 2},
            {row: 3, col: 1, visited: false, value: 3},
            {row: 1, col: 2, visited: false, value: 4},
            {row: 3, col: 2, visited: false, value: 6},
            {row: 4, col: 2, visited: false, value: 2},
            {row: 2, col: 3, visited: false, value: 6},
            {row: 4, col: 3, visited: false, value: 1},
            {row: 3, col: 4, visited: false, value: 6},
            {row: 6, col: 4, visited: false, value: 5},
            {row: 2, col: 5, visited: false, value: 5},
            {row: 0, col: 0, visited: false, value: 1, endGame: true}
        ]
    },
    {
        height: 8,
        width: 8,
        startPos: {row: 0, col: 0},
        definedTiles: [
            {row: 1, col: 0, visited: false, value: 6},
            {row: 5, col: 1, visited: false, value: 5},
            {row: 6, col: 1, visited: false, value: 1},
            {row: 7, col: 1, visited: false, value: 4},
            {row: 1, col: 2, visited: false, value: 4},
            {row: 6, col: 2, visited: false, value: 8},
            {row: 7, col: 4, visited: false, value: 6},
            {row: 2, col: 5, visited: false, value: 2},
            {row: 4, col: 5, visited: false, value: 4},
            {row: 3, col: 6, visited: false, value: 1},
            {row: 4, col: 6, visited: false, value: 3},
            {row: 7, col: 6, visited: false, value: 6},
            {row: 6, col: 7, visited: false, value: 1, endGame: true}
        ]
    },    
];

module.exports = templates;