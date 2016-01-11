(function () {
    var router = angular.module("router", []);
    var routes = {};
    var compositeFunction = function (route, context) {
        return function () {
            this.default(false);
            for (var i in routes[route]) {
                routes[route][i].apply(context, arguments);
            }
            setTimeout(function() {
                this.scope.$digest();
            }.bind(this),10);
        }
    }

    var generic = function(route) {
        return function(func, context) {
            this.compositeRoute(route, func, context);
        }
    }

    var Router = Backbone.Router.extend({

        initialize: function() {
            for(var i in this.addToRoute) {
                this.addToRoute[i] = this.addToRoute[i].bind(this);
            }
        },

        routes: {
            '*all': 'default'
        },

        default: function(trigger) {
            if(routes.all) {
                for (var i in routes.all) {
                    routes.all[i].apply();
                }
                if (trigger) {
                    setTimeout(function() {
                        this.scope.$digest();
                    }.bind(this),10);
                }
            }
        },

        compositeRoute: function (route, func, context) {
            if (!routes[route]) {
                routes[route] = [];
                this.route(route, compositeFunction(route, context).bind(this));
            }
            routes[route].push(func);
        },

        addToRoute: {
            overview: generic("overblik"),
            visit: generic("besoeg/:id"),
            assesment: generic("besoeg/:id/vurdering"),
            all: generic("all")
        }

    });

    router.value('router', new Router());
})();