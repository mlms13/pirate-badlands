var Grid = function () {
    var self = this,
        $grid = $('<div class="grid" />'),
        cursorPos = {};

    this.tiles = []; // an array of tile objects

    function checkValidMove(row, col) {
        // keep track of the value of the clicked tile
        var value = self.tiles[row][col].value;

        // invalid if you click on current cursor
        if (row === cursorPos.row && col === cursorPos.col) return false;

        // make sure the row is within one
        if (Math.abs(cursorPos.row - row) > 1) return false;

        // make sure the column is within one
        if (Math.abs(cursorPos.col - col) > 1) return false;

        // make sure the clicked tile wasn't a diagonal
        if (cursorPos.col !== col && cursorPos.row !== row) return false;

        // check to see if we're moving left
        if (cursorPos.col > col) {
            if (cursorPos.col - value < 0) {
                return false;
            } else {
                // move the cursor to the left
                alert('Move left ' + value);
            }
        } else if (cursorPos.col < col) {
            if (cursorPos.col + value > self.tiles[0].length - 1) {
                return false;
            } else {
                // move the cursor to the right
                alert('Move right ' + value);
            }
        }

        // check to see if we're moving up
        if (cursorPos.row > row) {
            if (cursorPos.row - value < 0) {
                return false;
            } else {
                // move the cursor up
                alert('Move up ' + value);
            }
        } else if (cursorPos.row < row) {
            if (cursorPos.row + value > self.tiles.length - 1) {
                return false;
            } else {
                // move the cursor to the down
                alert('Move down ' + value);
            }
        }
    }

    function makeTile(row, col) {
        var value = self.tiles[row][col].value;

        return $('<div class="grid-tile water">' + value + '</div>')
            .on('click', function () {
                // make sure the clicked tile is valid
                checkValidMove(row, col);
            });
    }

    this.createGrid = function (template) {
        var i, j, $row;

        for (i = 0; i < template.height; i++) {
            // push a nested array so we can access tiles like this: [2][1]
            self.tiles.push([]);

            // a reference to the DOM element for this row
            $row = $('<div class="grid-row" />').appendTo($grid);

            for (j = 0; j < template.width; j++) {
                self.tiles[i].push({
                    visited: false,
                    value: Math.ceil(Math.random() * 9)
                });
                self.tiles[i][j].$el = makeTile(i, j).appendTo($row);
            }
        }

        return self;
    };

    this.draw = function ($parent) {
        $grid.appendTo($parent || $('body'));
        return self;
    };

    this.placeCursor = function (tile) {
        var coords = {
            row: Math.floor(Math.random() * self.tiles.length),
            col: Math.floor(Math.random() * self.tiles[0].length)
        };

        tile = tile || self.tiles[coords.row][coords.col];
        tile.visited = true;
        tile.$el.addClass('cursor');
        cursorPos = coords;

        return self;
    };
};

module.exports = Grid;