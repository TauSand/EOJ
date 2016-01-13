(function () {
    angular.module('tabsModule', ['router'])
        .directive('notificationbar', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'templates/tabs/notificationbar.html',

            }
        })

        .directive('barbutton', function (router) {
            return {
                scope: {
                    icon: '@',
                    notifications: '=',
                    link: '=',
                    match: '@',
                    show: "="
                },
                restrict: 'E',
                templateUrl: 'templates/tabs/barbutton.html',
                link: function (scope) {
                    scope.show = scope.show ? scope.show : true;
                    scope.selected = false;
                    router.addToRoute.all(function () {
                        scope.selected = false;
                    });
                    router.addToRoute[scope.match](function () {
                        scope.selected = true;
                    });

                    scope.onClick = function () {
                        var route = typeof scope.link == "function" ? scope.link() : scope.link;
                        router.navigate(route, {trigger: true});
                    }
                }
            }
        })

        .directive('tabscontainer', function () {
            return {
                scope: {},
                restrict: 'E',
                transclude: true,
                templateUrl: 'templates/tabs/tabscontainer.html',
                link: function (scope, element) {
                    var children = element.children().children().children().length;
                    scope.sizes = {
                        tabsWidth: (100 / children) + "%",
                        width: (100 * children) + "%"
                    }

                }
            }
        })

        .directive('tab', function (router) {
            return {
                scope: {
                    'match': '@'
                },
                transclude: true,
                restrict: 'E',
                templateUrl: 'templates/tabs/tab.html',
                link: function (scope, element) {
                    router.addToRoute[scope.match](function() {
                        element.parent().css({'margin-left': '-'+($(element).index()*100)+'%'})
                    });
                    var children = element.parent().children().length;
                    scope.sizes = {
                        tabsWidth: (100 / children) + "%",
                    }
                }

            }
        });
})()




