var directives = angular.module('directives', []);

directives.directive('header', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'templates/header.html',
        link: function (scope, elem, attrs) {
            scope.open = false;
            scope.openClick = function () {
                scope.open = true;
            }
        }
    }
});

directives.directive('sidebar', function () {
    return {
        scope: {
            open: '='
        },
        restrict: 'E',
        templateUrl: 'templates/sidebar.html',
        link: function (scope, elem, attrs) {
            scope.close = function () {
                scope.open = false;
            }
        }
    }
});
