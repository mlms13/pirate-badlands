var Tooltip = function (message) {
    this.$el = null;
    this.message = message;
    this.show = function ($el) {
        this.$el = $el;
        $el.tooltip({'trigger': '', 'placement': 'top', 'title': this.message}).tooltip('show');
    };
    this.hide = function () {
        if (this.$el) {
            this.$el.tooltip('hide');
        }
    };
};

var tutorial = {};

tutorial.messages = {
    'move-ship': new Tooltip('Move 3 tiles east by clicking this square next to it.'),
    'booty': new Tooltip('Your objective is to reach the booty.'),
    'score': new Tooltip('You earn points for each tile you move through.'),
    'flotsam': new Tooltip('Ending on a tile with flotsam will give you more points.')
};

tutorial.hideAllMessages = function () {
    var message;

    for (message in tutorial.messages) {
            tutorial.messages[message].hide();
    }
};

module.exports = tutorial;