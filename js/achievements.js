var storage = require('./storage');
var notification = require('./notifications');

var user;

console.log('eh?');

$(document).on('levelCompleted', function () {
	user = storage.getData('user');

	if (user.noLevels === 1 && user.topScores.length === 1) {
		notification.alert({
			type: 'warning',
			title: 'Achievement Attained!',
			message: 'Swiggity Swooty I\'m coming for that booty!'
		});
		user.achievements.push("Swiggity Swooty");
	}
});