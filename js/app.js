Backbone.history.start({pushState: true});

angular.module('EOJ', ['databaseservice','main', 'header', 'mymessages', 'tabsModule', 'careplan', 'assesment', 'router', 'assignment', 'plan', 'personal', 'dropdown', 'ripple', 'popup', 'sul', 'selectlinkpopup', 'citizenplan', 'fab']);

$(window).keydown(function (e) {
    if (e.keyCode == 116) {
        (new Backbone.Router()).navigate("/EOJ/index.html");
    }
});

$(function() {
    new (Backbone.Router.extend({}))().navigate("/overblik", {trigger: true});
});

function find(object, value) {
    if(typeof object == 'object') {
        for(var i in object) {
            if(i == value) {
                return object[i];
            }
            else {
                var result = find(object[i], value);
                if(result) {
                    return result;
                }
            }
        }
    }
}

function resetDB() {
    var db = new PouchDB("database");
    db.destroy();
}