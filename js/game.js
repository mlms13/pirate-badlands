// required stuff
var Grid = require('./grid');
var templates = require('./templates');

// this module
var game = {};

// helper validation functions (the rules of the game)
function validateClick(cursor, tile) {
    // invalid if you click on current cursor
    if (tile.row === cursor.row && tile.col === cursor.col) return false;

    // make sure the row is within one
    if (Math.abs(cursor.row - tile.row) > 1) return false;

    // make sure the column is within one
    if (Math.abs(cursor.col - tile.col) > 1) return false;

    // make sure the clicked tile wasn't a diagonal
    if (cursor.col !== tile.col && cursor.row !== tile.row) return false;

    return true;
}

game.startGame = function (level) {	
    game.grid = new Grid({
        cursor: templates[level].startPos,
        clickTile: {
            validate: validateClick
        }
    });
    game.grid.createGrid(templates[level]).draw();
};

module.exports = game;