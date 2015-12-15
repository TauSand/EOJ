angular.module('tabsModule', [])
    .controller()

    .factory('countChildren', function () {
        var id = 0;
        return {
            tau: function(param1, param2) {console.log(id++)},
            daniela: function() {console.log(id++)}
        }

    })

    .directive('notificationbar', ['countChildren', function (countChildren) {
        return {
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'templates/tabs/notificationbar.html',
            link: function (scope, elem, attr) {
                console.log(elem);
                console.log(scope);
                countChildren.tau("hej", "tau");
                countChildren.daniela()
            },
            controller: function () {

            }
        }
    }])

    .directive('barbutton', function () {
        return {
            scope: {
                icon: '@',
                notifications: '@'
            },
            restrict: 'E',
            templateUrl: 'templates/tabs/barbutton.html'
        }
    })

    .directive('tabscontainer', function () {
        return {
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'templates/tabs/tabscontainer.html'
        }
    })

    .directive('tab', function () {
        return {
            scope: {
                tabname: '@'
            },
            restrict: 'E',
            templateUrl: 'templates/tabs/tab.html'
        }
    });



