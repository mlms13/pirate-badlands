var templates = [
	{
		height: 6,
		width: 6,
		definedTiles: [
			{row: 4, col: 2, visited: false, value: 3},
			{row: 3, col: 4, visited: false, value: 3},
			{row: 0, col: 4, visited: false, value: 3},
			{row: 1, col: 5, visited: false, value: 1},
			{row: 1, col: 4, visited: false, value: 1, points: 50},
			{row: 0, col: 5, visited: false, value: 1, endGame: true}
		]
	}
];

module.exports = templates;