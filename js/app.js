Backbone.history.start({pushState: true});

angular.module('EOJ', ['databaseservice','main', 'header', 'tabsModule', 'careplan']);

$(function() {
    new (Backbone.Router.extend({}))().navigate("/overblik", {trigger: true});
});
