var Cursor = require('./cursor');

var Grid = function (options) {
    var self = this,
        cursor = new Cursor(options.cursor);

    this.tiles = []; // an array of tile objects

    function createTileElement(row, col) {
        var tile = self.tiles[row][col];

        return $('<div class="grid-tile water">' + tile.value + '</div>')
            .on('click', function () {
                // make sure the clicked tile is valid
                if (options.clickTile.validate(cursor, {row: row, col: col, value: tile.value})) {
                    console.log('The click was valid... attempting to move cursor');
                    cursor.move(row, col, tile.value, self.tiles);
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