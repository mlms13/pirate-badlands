var Cursor = function (options) {
    var self = this,
        $el = null;

    this.row = options.row;
    this.col = options.col;

    this.drawElement = function ($parent) {
        $el = $('<div class="cursor" />').appendTo($parent);
    };

    this.moveElement = function (coords) {
        // get the height and width of the element (which should match the size of each tile)
        var height = $el.height(),
            width = $el.width();

        // console.log(height);

        $el.css({
            top: (coords.row * height) + 'px',
            left: (coords.col * width) + 'px'
        });
    };

    this.place = function (coords) {
        // TODO: add functionality that states if you land at some point on land (value = -1), go back to starting position and trigger notification
        // update the cursor's position
        this.row = coords.row;
        this.col = coords.col;

        self.moveElement(coords);

        $(window).on('resize', function() {
            self.moveElement(coords);
        });

        $(document).trigger('cursorPlaced', coords);
    };

    this.definePath = function (direction, distance) {
        var i, pitStops = [];

        switch (direction) {
            case 'n':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col,
                        row: this.row - i
                    });
                }
                break;
            case 's':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col,
                        row: this.row + i
                    });
                }
                break;
            case 'e':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col + i,
                        row: this.row
                    });
                }
                break;
            case 'w':
                for (i = 1; i <= distance; i++) {
                    pitStops.push({
                        col: this.col - i,
                        row: this.row
                    });
                }
                break;
        }
        this.visitTiles(pitStops);
    };

    this.visitTiles = function(tiles, index) {
        // TODO: add something that stops the cursor from going on land
        // Techincally we already check for this back in the game logic.
        // But if we want to, we could move that check here (or re-check).

        index = index || 0;

        if (index === 0) {
            // let everyone know we've started moving the cursor
            $(document).trigger('cursorStarted', tiles[index]);
        }

        if (index >= tiles.length) {
            // let everyone know we've reached the end
            $(document).trigger('cursorEnded', tiles[tiles.length - 1]);
            return;
        }
        // place the cursor on the tile
        self.place(tiles[index]);

        // then, after a short timeout, do it all over again with the next tile
        window.setTimeout(function () {
            self.visitTiles(tiles, index + 1);
        }, 80);
    };
};

module.exports = Cursor;