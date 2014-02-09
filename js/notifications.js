var notification = {
    "list": [],
    "$area": $('.notification-area')
};

// TODO: fix this so it doesn't overlay the game board if the window is small enough
//       After the notification is faded away, we should probably put a display: none on the element
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

notification.modal = function (data) {
    var $modal = $('<div class="modal fade" />'),
        $dialog = $('<div class="modal-dialog" />').appendTo($modal),
        $content = $('<div class="modal-content" />').appendTo($dialog),
        $header = $('<div class="modal-header" />'),
        $body = $('<div class="modal-body">' + data.message + '</div>'),
        $footer = $('<div class="modal-footer" />');

    if (data.title) {
        $header.append($('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times</button>'))
            .append($('<h4 class="modal-title">' + data.title + '</h4>'))
            .appendTo($content);
    }

    $content.append($body);
    $content.append($footer);
    $('<button class="btn btn-info" data-dismiss="modal">' + data.buttonText + '</button>').on('click', function () {
        data.clickHandler();
    }).appendTo($footer);

    $modal.appendTo($('body')).modal('show');
};

module.exports = notification;
