var game = require('./game');
var storage = require('./storage');

if (localStorage && storage.getUser()) {
	var user = storage.getUser();
} else {
	storage.saveUserState({noLevels: 0, achievements: []});
}

$('#startGame').on('click', function() {
	game.startGame();
	console.log(game.grid.tiles.length);
});