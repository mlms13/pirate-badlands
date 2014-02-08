// required stuff
var Grid = require('./grid');

// this module
var game = {};

game.startGame = function() {
	game.grid = new Grid();
	game.grid.construct(30, 30);
};

module.exports = game;