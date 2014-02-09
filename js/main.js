var game = require('./game');
var storage = require('./storage');

$('#startGame').on('click', function() {
    var user;

    if (localStorage && storage.getUser()) {
        user = storage.getUser();
    } else {
        user = {noLevels: 0, achievements: []};
        storage.saveUserState(user);
    }

    game.startGame(user.noLevels);
    $(document).trigger('gameStarted');
});

// Handle height for tiles
// $(document).on('gameStarted', function () {
//     setHeight();
// });
// $(window).on('resize', function () {
//     setHeight();
// });
// function setHeight() {
//     var elWidth = $('.grid-tile').first().width();

//     if ( $('#inlineHeight').length === 0 ) {
//         $('head').append('<style id="inlineHeight" />');
//     }
//     $('#inlineHeight').html('.grid-tile { height:' + elWidth + 'px }</style>');
// }