// required stuff
var Grid = require('./grid');
var templates = require('./templates');
var notification = require('./notifications');
var storage = require('./storage');

// Game constructor
var Game = function (options) {
    var self = this;
    this.grid = null;

    // helper validation functions (the rules of the game)
    function validateClick(cursor, tile) {
        // invalid if you click on current cursor
        if (tile.row === cursor.row && tile.col === cursor.col) { 
            notification.alert({type: 'danger', message: 'Arrgghhhh. This be \'yer ship, matey.'});
            return false;
        }

        // make sure the row is within one
        if (Math.abs(cursor.row - tile.row) > 1) { 
            notification.alert({type: 'danger', message: 'Arrgh, see about clicking a tile closer to ye port side.'});
            return false;
        }

        // make sure the column is within one
        if (Math.abs(cursor.col - tile.col) > 1) { 
            notification.alert({type: 'danger', message: 'Arrrr, try clicking a tile next to \'yer ship.'});
            return false;
        }

        // make sure the clicked tile wasn't a diagonal
        if (cursor.col !== tile.col && cursor.row !== tile.row) { 
            notification.alert({type: 'danger', message: "\'Yer ship doesn\'t know how to move on the ol' diagonal, mate."});
            return false;
        }

        return true;
    }

    function getDirection(cursor, tile) {
        // check to see if we're moving left
        if (cursor.col > tile.col) {
            if (cursor.col - tile.value < 0) {
                notification.alert({type: 'danger', message: "Arrg, moving there would run yer ship ashore, mate."});
                return false;
            } else {
                // move the cursor to the left
                return 'w';
            }
        } else if (cursor.col < tile.col) {
            if (cursor.col + tile.value > self.grid.width - 1) {
                notification.alert({type: 'danger', message: "Arrg, moving there would run yer ship ashore, mate."});
                return false;
            } else {
                // move the cursor to the right
                return 'e';
            }
        }

        // check to see if we're moving up
        if (cursor.row > tile.row) {
            if (cursor.row - tile.value < 0) {
                notification.alert({type: 'danger', message: "Arrg, moving there would run yer ship ashore, mate."});
                return false;
            } else {
                // move the cursor up
                return 'n';
            }
        } else if (cursor.row < tile.row) {
            if (cursor.row + tile.value > self.grid.height - 1) {
                notification.alert({type: 'danger', message: "Arrg, moving there would run yer ship ashore, mate."});
                return false;
            } else {
                // move the cursor down
                return 's';
            }
        }
    }

    this.startLevel = function (level) {
        // TODO: Add a class to the page if the template is bigger than 9 tiles wide?

        // make sure we're starting with a clean slate
        $('#game-board').empty();

        self.grid = new Grid({
            template: templates[level],
            clickTile: function (cursor, tile) {
                var isValid = validateClick(cursor, tile),
                    direction = isValid && getDirection(cursor, tile);

                if (direction) {
                    cursor.definePath(direction, tile.value);
                }
            }
        });

        self.grid.createGrid().draw();

        $(document).trigger('levelStarted');

        notification.alert({
            type: 'success',
            title: 'Ready to set sail first mate?',
            message: 'All hands on deck, we sail at once for ye Booty!.'
        });
    };

    $(document).on('cursorEnded', function (event, data) {
        if (self.grid.getTileByIndex(data.row, data.col).endGame) {
            // TODO: make it to where the cursor doesn't actually move to the booty?
            //       It would be cool if we had the pirate ship one block away so we can see the open treasure chest.
            self.grid.getTileByIndex(data.row, data.col).$el.addClass('open');

            // increment noLevels, give option to start next game
            // TODO: add modal window for next game (looks done, but needs to be implemented)
            // TODO: when noLevels = templates.length then end the game and post high score or some shit.
            var user = storage.getUser();
            user.noLevels++;
            storage.saveUserState(user);

            if (user.noLevels === templates.length) {
                notification.modal({
                    title: 'Arrrrr ye be one fair pirate!',
                    message: 'Ye have completed all levels matey!  Click on Restart Game to reset your game and see if you can top your high score!  Your achievements will persist.',
                    buttonText: 'Restart Game',
                    clickHandler: function () {
                        newUser = storage.resetAndGetUser();
                        self.startLevel(newUser.noLevels);
                    }
                });
            } else {
                notification.modal({
                    title: 'Argggghh!',
                    message: 'You have found the booty and conquered this sea!  On to the Next!',
                    buttonText: 'Next Level',
                    clickHandler: function () {
                        self.startLevel(user.noLevels);
                    }
                });
            }
        }
    });
};

module.exports = Game;