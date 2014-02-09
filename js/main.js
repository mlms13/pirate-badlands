var Game = require('./game');
var storage = require('./storage');

$('#startGame').on('click', function() {
    var user, game;

    $('#game-board').empty();

    if (localStorage && storage.getUser()) {
        user = storage.getUser();
    } else {
        user = {noLevels: 0, achievements: []};
        storage.saveUserState(user);
    }

    game = new Game({level: user.noLevels});
    game.start();
    $(document).trigger('gameStarted');
});

// Handle height for tiles
$(document).on('gameStarted', function () {
    setHeight();
});
$(window).on('resize', function () {
    setHeight();
});
function setHeight() {
    var elWidth = $('.grid-tile').first().width(),
        elHeight = elWidth * 1.3;

    if ( $('#inlineHeight').length === 0 ) {
        $('head').append('<style id="inlineHeight" />');
    }
    $('#inlineHeight').html('.grid-tile { height:' + elHeight + 'px; line-height:' + (elHeight * 0.70) + 'px; margin-top: -' + (elHeight * 0.37) + 'px } .grid-tile:hover { top: -' + (elHeight * 0.077) + 'px }</style>');
}
