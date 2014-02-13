var storage = {};

storage.getData = function (item, key) {
	var data = JSON.parse(localStorage.getItem(item));

	if (key !== undefined) {
		return data[key];
	} else {
		return data;
	}
};

storage.setData = function (item, key, value) {
	var data = storage.getData(item);
	data[key] = value;
	localStorage.setItem(item, JSON.stringify(data));
	return storage.getData(item, key);
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