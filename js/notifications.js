var notification = {
    "list": [],
    "$area": $('.notification-area')
};

notification.alert = function (data) {
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
        $el.append($('<strong>' + data.title + ' </strong>'));
    }

    // add the message, then display it
    $el
        .append($('<span>' + data.message + '</span>'))
        .appendTo(notification.$area)
        .addClass('in');

    window.setTimeout(function () {
        $el.removeClass('in');
    }, data.timeout || 8000);

    // store this notification
    notification.list.push(data);
};

module.exports = notification;
