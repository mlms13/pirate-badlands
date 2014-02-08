// required stuff
var Grid = require('./grid');

// this module
var game = {};

game.startTutorial = function () {
	game.grid = new Grid();
	game.grid.createFixed().draw().placeCursor();
};

game.startGame = function () {
	game.grid = new Grid();
	game.grid.createRandom(30, 30).draw().placeCursor();
};

module.exports = game;