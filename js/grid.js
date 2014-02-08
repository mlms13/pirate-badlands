var Grid = function (options) {
    var self = this,
        cursor = {};

    cursor.place = function (coords, tile) {
        $('.cursor').removeClass('cursor');
        tile.visited = true;
        tile.$el.addClass('cursor');

        // update the cursor's position
        cursor.row = coords.row;
        cursor.col = coords.col;
    };
    cursor.move = function (row, col, value) {
        // check to see if we're moving left
        if (cursor.col > col) {
            if (cursor.col - value < 0) {
                return false;
            } else {
                // move the cursor to the left
                cursor.place({row: cursor.row, col: cursor.col - value}, self.tiles[cursor.row][cursor.col - value]);
            }
        } else if (cursor.col < col) {
            if (cursor.col + value > self.tiles[0].length - 1) {
                return false;
            } else {
                // move the cursor to the right
                cursor.place({row: cursor.row, col: cursor.col + value}, self.tiles[cursor.row][cursor.col + value]);
            }
        }

        // check to see if we're moving up
        if (cursor.row > row) {
            if (cursor.row - value < 0) {
                return false;
            } else {
                // move the cursor up
                cursor.place({row: cursor.row - value, col: cursor.col}, self.tiles[cursor.row - value][cursor.col]);
            }
        } else if (cursor.row < row) {
            if (cursor.row + value > self.tiles.length - 1) {
                return false;
            } else {
                // move the cursor to the down
                cursor.place({row: cursor.row + value, col: cursor.col}, self.tiles[cursor.row + value][cursor.col]);
            }
        }
    };

    this.tiles = []; // an array of tile objects

    function checkValidMove(row, col, value) {
        // invalid if you click on current cursor
        if (row === cursor.row && col === cursor.col) return false;

        // make sure the row is within one
        if (Math.abs(cursor.row - row) > 1) return false;

        // make sure the column is within one
        if (Math.abs(cursor.col - col) > 1) return false;

        // make sure the clicked tile wasn't a diagonal
        if (cursor.col !== col && cursor.row !== row) return false;

        return true;
    }

    function createTileElement(row, col) {
        var value = self.tiles[row][col].value;

        return $('<div class="grid-tile water">' + value + '</div>')
            .on('click', function () {
                // make sure the clicked tile is valid
                if (checkValidMove(row, col, value)) {
                    console.log('The click was valid... attempting to move cursor');
                    cursor.move(row, col, value);
                }
            });
    }

    this.createGrid = function (template) {
        var i, j;

        for (i = 0; i < template.height; i++) {
            // push a nested array so we can access tiles like this: [2][1]
            self.tiles.push([]);

            // a reference to the DOM element for this row
            for (j = 0; j < template.width; j++) {
                self.tiles[i].push({
                    visited: false,
                    value: Math.ceil(Math.random() * ((Math.sqrt(template.height * template.width)) * 0.6))
                });
            }
        }

        // loop through each predefined tile and create it
        template.definedTiles.forEach(function(tile) {
            self.tiles[tile.row][tile.col] = tile;
        });

        return self;
    };

    this.draw = function ($parent) {
        var i, j, $row,
        $grid = $('<div class="grid" />'),
        rowCount = self.tiles.length,
        colCount = self.tiles[0].length;

        for (i = 0; i < rowCount; i++) {
            $row = $('<div class="grid-row" />').appendTo($grid);
            for (j = 0; j < colCount; j++) {
                self.tiles[i][j].$el = createTileElement(i, j).appendTo($row);
            }
        }

        // draw the cursor accordion to the options passed to the grid constructor
        cursor.place(options.cursor, self.tiles[options.cursor.row][options.cursor.col]);

        $grid.appendTo($parent || $('body'));

        return self;
    };
};

module.exports = Grid;