var game = require('./game');
var storage = require('./storage');

if (localStorage && storage.getUser()) {
	var user = storage.getUser();
	console.log(user);
} else {
	storage.saveUserState({noLevels: 0, achievements: []});
	console.log("saved user state");
}

$('#startGame').on('click', function() {
	game.startGame();
	console.log(game.grid.tiles.length);
});