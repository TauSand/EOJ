Backbone.history.start({pushState: true});

angular.module('EOJ', ['databaseservice','main', 'header', 'tabsModule', 'careplan', 'assesment', 'router', 'assignment', 'plan', 'personal', 'dropdown', 'ripple', 'popup']);

$(window).keydown(function (e) {
    if (e.keyCode == 116) {
        (new Backbone.Router()).navigate("/EOJ/index.html");
    }
});

$(function() {
    new (Backbone.Router.extend({}))().navigate("/overblik", {trigger: true});
});