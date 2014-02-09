var storage = {};

storage.getUser = function () {
	return JSON.parse(localStorage.getItem('user'));
};

storage.saveUserState = function (user) {
	localStorage.setItem('user', JSON.stringify(user));
};

storage.resetAndGetUser = function () {
	var user = JSON.parse(localStorage.getItem('user'));
	user.topScores.push(user.totalScore);
	localStorage.setItem('user', JSON.stringify({noLevels: 0, achievements: user.achievements, totalScore: 0, topScores: user.topScores}));
	return JSON.parse(localStorage.getItem('user'));
};

module.exports = storage;