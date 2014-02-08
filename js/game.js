// required stuff
var Grid = require('./grid');
var templates = require('./templates');

// this module
var game = {};

// helper validation functions (the rules of the game)
function validateClick(cursor, tile) {
    // invalid if you click on current cursor
    if (tile.row === cursor.row && tile.col === cursor.col) { 
        console.log('You clicked on the cursor');
        return false; }

    // make sure the row is within one
    if (Math.abs(cursor.row - tile.row) > 1) { 
        console.log('You clicked a row that is too far away');
        return false; }

    // make sure the column is within one
    if (Math.abs(cursor.col - tile.col) > 1) { 
        console.log('You clicked a column that is too far away');
        return false; }

    // make sure the clicked tile wasn't a diagonal
    if (cursor.col !== tile.col && cursor.row !== tile.row) { 
        console.log('You clicked a diagonal tile and we do not like that');
        return false; }

    return true;
}

function getDirection(cursor, tile) {
    // check to see if we're moving left
    if (cursor.col > tile.col) {
        if (cursor.col - tile.value < 0) {
            return false;
        } else {
            // move the cursor to the left
            return 'w';
        }
    } else if (cursor.col < tile.col) {
        if (cursor.col + tile.value > game.grid.width - 1) {
            return false;
        } else {
            // move the cursor to the right
            return 'e';
        }
    }

    // check to see if we're moving up
    if (cursor.row > tile.row) {
        if (cursor.row - tile.value < 0) {
            return false;
        } else {
            // move the cursor up
            return 'n';
        }
    } else if (cursor.row < tile.row) {
        if (cursor.row + tile.value > game.grid.height - 1) {
            return false;
        } else {
            // move the cursor to the down
            return 's';
        }
    }
}

game.startGame = function (level) {
    game.grid = new Grid({
        cursor: templates[level].startPos,
        height: templates[level].height,
        width: templates[level].width,
        clickTile: function (cursor, tile) {
            var isValid = validateClick(cursor, tile),
                direction = isValid && getDirection(cursor, tile);

            if (direction) {
                cursor.definePath(direction, tile.value);
            }
        }
    });
    game.grid.createGrid(templates[level]).draw();
};

module.exports = game;