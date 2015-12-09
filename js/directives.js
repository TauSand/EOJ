var directives = angular.module('directives', []);

directives.directive('header', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'templates/header.html',
        link: function(scope, elem, attrs) {
            scope.open = "hello";
            scope.openClick = function() {
                scope.open = !scope.open
            }
        }
    }
});

directives.directive('sidebar', function() {
    return {
        scope: {
            open: '@'
        },
        restrict: 'E',
        templateUrl: 'templates/sidebar.html'
    }
});