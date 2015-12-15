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
            templateUrl: 'templates/notificationbar.html',
            link: function (scope, elem, attr) {
                console.log(elem);
                console.llog(scope);
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
            templateUrl: 'templates/barbutton.html'
        }
    })

    .directive('tabscontainer', function () {
        return {
            scope: {},
            restrict: 'E',
            transclude: true,
            templateUrl: 'templates/tabscontainer.html'
        }
    })

    .directive('tab', function () {
        return {
            scope: {
                tabname: '@'
            },
            restrict: 'E',
            templateUrl: 'templates/tab.html'
        }
    });



