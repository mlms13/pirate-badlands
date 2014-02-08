var Grid = function () {
    var self = this,
        $grid = $('<div class="grid" />');

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
                this.tiles[i].push({
                    visited: false,
                    value: Math.ceil(Math.random() * 9)
                });
                this.tiles[i][j].$el = makeTile(i, j).appendTo($row);
            }
        }
        return self;
    };

    this.draw = function ($parent) {
        $grid.appendTo($parent || $('body'));
        return self;
    };
};

module.exports = Grid;