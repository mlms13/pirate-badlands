var game = require('./game');
var storage = require('./storage');

if (localStorage && storage.getUser()) {
	var user = storage.getUser();
} else {
	storage.saveUserState({noLevels: 0, achievements: []});
}

$('#startGame').on('click', function() {
	game.startGame();
	$('document').trigger('gameStarted');
});

// Handle height for tiles
$(document).on('gameStarted', function () {
    getHeight();
});
$(window).on('resize', function () {
    getHeight();
});
function getHeight() {
    var elWidth = $('.grid-tile').first().width();

    if ( $('#inlineHeight').length === 0 ) {
        $('head').append('<style id="inlineHeight">.grid-tile { height:' + elWidth + 'px }</style>');
    } else {
        $('#inlineHeight').html('.grid-tile { height:' + elWidth + 'px }</style>');
    }
}