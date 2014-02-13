var Game = require('./game');
var storage = require('./storage');

$('#startGame').on('click', function() {
    var user, game;

    if (localStorage && !storage.getData('user')) {
        storage.setData('user', 'noLevels', 0);
        storage.setData('user', 'achievements', []);
        storage.setData('user', 'totalScore', 0);
        storage.setData('user', 'topScores', [0]);
    }

    user = storage.getData('user');

    $('#resetGame').on('click', function() {
        game.startLevel(storage.getData('user', 'noLevels'));
    });

    game = new Game();
    game.startLevel(user.noLevels);
});

// Handle inline styling for tiles
// Kind of necessary since we're using ratios of height to width for basically everything
$(document).on('levelStarted', function () {
    inlineStyles();
});
$(window).on('resize', function () {
    inlineStyles();
});
function inlineStyles() {
    var elWidth = $('.grid-tile').first().width(),
        elHeight = elWidth * 1.3;

    if ( $('#inlineCSS').length === 0 ) {
        $('head').append('<style id="inlineCSS" />');
    }
    $('#inlineCSS').html('.grid-tile {' +
            'height:' + elHeight + 'px;' +
            'line-height:' + (elHeight * 0.70) + 'px;' +
            'margin-top: -' + (elHeight * 0.37) + 'px }' +
        '.grid-tile:hover { top: -' + (elHeight * 0.077) + 'px }' +
        '.cursor {' +
            'height:' + (elHeight - (elHeight * 0.37)) + 'px;' +
            'margin-top: -' + ((elHeight * 0.37) - (elHeight * 0.05)) + 'px;' +
            'width: ' + elWidth + 'px;' +
        '}');
}
