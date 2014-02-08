var storage = {};

storage.getUser = function () {
	return JSON.parse(localStorage.getItem('user'));
};

storage.saveUserState = function (user) {
	localStorage.setItem('user', JSON.stringify(user));
};

module.exports = storage;