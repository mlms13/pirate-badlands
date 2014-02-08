// required stuff
var Grid = require('./grid');
var templates = require('./templates');

// this module
var game = {};

game.startGame = function (level) {	
	game.grid = new Grid();
	game.grid.createGrid(templates[level]).draw().placeCursor();
};

module.exports = game;