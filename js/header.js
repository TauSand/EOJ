var header = angular.module('header', []);

header.directive('header', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'templates/header/header.html',
        link: function (scope, elem, attrs) {
            scope.onTap = function() {
                alert("tap");
            }
            scope.open = false;
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