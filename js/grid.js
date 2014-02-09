var Cursor = require('./cursor');

var Grid = function (options) {
    var self = this,
        cursor = new Cursor(options.cursor),
        tiles = [], // an array of tile objects
        score = 0,
        moves = -1; // So our initial placement gets it to 0

    this.height = options.height;
    this.width = options.width;

    // listen for global events
    $(document).on('cursorPlaced', function (event, data) {
        var tile = tiles[data.row][data.col];

        $('.selected').removeClass('selected');
        if (!tile.visited) {
            score += tile.value;

            if (tile.points) {
                score += tile.points;
            }
        }
        moves += 1;

        tile.clearTile();
        // tile.visited = true; // Redundant? It's done in clearTile().
        tile.$el.html('');
        tile.$el.addClass('visited selected');

        $('.game-score').text(score);
        $('.game-moves').text(moves);
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

        if (tile.points) {
            className = 'flotsam text-hide';
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