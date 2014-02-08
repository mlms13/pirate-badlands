var Grid = function () {
    var self = this,
        $grid = $('<div class="grid" />'),
        cursorPos = {};

    this.tiles = []; // an array of tile objects

    function makeTile(i, j) {
        return $('<div class="grid-tile water">' + self.tiles[i][j].value + '</div>')
            .on('click', function () {
                alert('You clicked the tile at index: ' + i + ' ' + j + ' with a value of:' + self.tiles[i][j].value);
            });
    }

    this.construct = function (height, width) {
        var i, j, $row;

        for (i = 0; i < height; i++) {
            // push a nested array so we can access tiles like this: [2][1]
            self.tiles.push([]);

            // a reference to the DOM element for this row
            $row = $('<div class="grid-row" />').appendTo($grid);

            for (j = 0; j < width; j++) {
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
            x: Math.floor(Math.random() * self.tiles.length),
            y: Math.floor(Math.random() * self.tiles[0].length)
        };

        tile = tile || self.tiles[coords.x][coords.y];
        tile.visited = true;
        tile.$el.addClass('cursor');
        cursorPos = coords;

        return self;
    };
};

module.exports = Grid;