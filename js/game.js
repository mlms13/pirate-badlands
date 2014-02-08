// required stuff
var Grid = require('./grid');
var templates = require('./templates');

// this module
var game = {};

game.startGame = function (level) {	
    game.grid = new Grid({
        cursor: templates[level].startPos
    });
    game.grid.createGrid(templates[level]).draw();
};

module.exports = game;