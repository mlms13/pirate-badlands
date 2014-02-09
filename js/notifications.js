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
    var $el;

    $el = $('<div class="modal fade" role="dialog" id="modal" />')
                .append($('<div class="modal-dialog"><div class="modal-content"></div></div>'));

    if (data.header) {
        $el.append($('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">' + data.header + '</h4></div>'));
    }

    $el.append($('<div class="modal-body">' + data.body + '</div>'));

    $el.append($('<div class="modal-footer"><button type="button" class="btn btn-primary">Next Level</button>'));

    $el.appendTo($('body'));

    $('#modal').modal('show');
};

module.exports = notification;
