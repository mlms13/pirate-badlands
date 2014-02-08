var game = require('./game');

$('#startGame').on('click', function() {
	game.startGame();
	console.log(game.grid.tiles.length);
});