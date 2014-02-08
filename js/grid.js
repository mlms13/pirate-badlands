var Grid = function () {
    var self = this;

    this.tiles = []; // an array of tile objects

    this.construct = function (height, width) {
        var i, j;

        for (i = 0; i < height; i++) {
            // push a nested array so we can access tiles like this: [2][1]
            self.tiles.push([]);

            for (j = 0; j < width; j++) {
                this.tiles[i].push({
                    visited: false,
                    value: Math.ceil(Math.random() * 9)
                });
            }
        }
        return self;
    }
};

module.exports = Grid;