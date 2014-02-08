var notification = {
    "list": [],
    "$area": $('.notification-area')
};

notification.show = function (data) {
    var $el;

    // default to info notifications if no type is provided
    data.type = data.type || 'info';

    // generate (but don't append) the notification element
    $el = $('<div class="alert alert-' + data.type + ' alert-dismissable fade" />')
                .append($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'));

    // make sure the notification area is empty before adding new notifications
    notification.$area.empty();

    // only append a title if we were given a title
    if (data.title) {
        $notification.append($('<strong>' + data.title + '</strong>'));
    }

    // add the message, then display it
    $el
        .append($('<span>' + data.message + '</span>'))
        .appendTo(notification.$area)
        .addClass('in');

    // store this notification
    notifications.push(data);
};

module.exports = notification;
