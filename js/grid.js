var Cursor = require('./cursor');

var Grid = function (options) {
    var self = this,
        cursor = new Cursor(options.cursor),
        tiles = [], // an array of tile objects
        score = 0;

    this.height = options.height;
    this.width = options.width;

    // listen for global events
    $(document).on('cursorPlaced', function (event, data) {
        $('.cursor').removeClass('cursor');
        tiles[data.row][data.col].clearTile();
        tiles[data.row][data.col].visited = true;
        tiles[data.row][data.col].$el.html('');
        tiles[data.row][data.col].$el.addClass('visited cursor');

        $('.game-score').text(score);
    });

    function createTileElement(row, col) {
        var tile = tiles[row][col];
        var className = 'water';

        if (tile.endGame) {
            className = 'booty text-hide';
        }

        if (tile.value === -1) {
            className = 'land text-hide';
        }

        return $('<div class="grid-tile ' + className + ' ">' + tile.value + '</div>')
            .on('click', function () {
                options.clickTile(cursor, tile);
            });
    }

    this.createGrid = function (template) {
        var i, j;

        for (i = 0; i < self.height; i++) {
            // push a nested array so we can access tiles like this: [2][1]
            tiles.push([]);

            for (j = 0; j < self.width; j++) {
                tiles[i].push({
                    visited: false,
                    value: Math.ceil(Math.random() * ((Math.sqrt(self.height * self.width)) * 0.8)),
                    row: i,
                    col: j,
                    clearTile: function() {
                        if (!this.visited) score += this.value;
                        this.visited = true;
                        this.value = 1;
                    }
                });
            }
        }

        // loop through each predefined tile and create it
        template.definedTiles.forEach(function(tile) {
            for (var prop in tile) {
                tiles[tile.row][tile.col][prop] = tile[prop];
            }
        });

        // Erase the value from the starting cursor position
        tiles[template.startPos.row][template.startPos.col].value = 0;

        return self;
    };

    this.getTileByIndex = function (row, col) {
        return tiles[row][col];
    };

    this.draw = function ($parent) {
        var i, j, $row,
        $grid = $('<div class="grid" />'),
        rowCount = tiles.length,
        colCount = tiles[0].length;

        for (i = 0; i < rowCount; i++) {
            $row = $('<div class="grid-row" />').appendTo($grid);
            for (j = 0; j < colCount; j++) {
                tiles[i][j].$el = createTileElement(i, j).appendTo($row);
            }
        }

        // draw the cursor according to the options passed to the grid constructor
        cursor.place(options.cursor);

        $grid.appendTo($parent || $('#game-board'));

        return self;
    };
};

module.exports = Grid;