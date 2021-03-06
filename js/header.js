var header = angular.module('header', []);

header.directive('header', function () {
    return {
        scope: {
            name: '=',
            showOverview: '=',
            backClick: '='
        },
        restrict: 'E',
        templateUrl: 'templates/header/header.html',
        link: function (scope, elem, attrs) {
            scope.open = false;
            scope.back = function() {
                scope.backClick();
            }
            scope.openClick = function () {
                scope.open = true;
            }
        }
    }
});

header.directive('sidebar', function () {
    return {
        scope: {
            open: '='
        },
        restrict: 'E',
        templateUrl: 'templates/header/sidebar.html',
        link: function (scope, elem, attrs) {
            scope.close = function () {
                scope.open = false;
            }
        }
    }
});