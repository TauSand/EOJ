var popup = angular.module('popup', []);

popup.directive('popup', function () {
    return {
        restrict: 'E',
        scope: {
            open: '=',
            onSave: '=',
            onCancel: '='
        },
        transclude: true,
        templateUrl: '/eoj/templates/popup/popup.html',
        link: function (scope, elem, attrs) {

        }
    }
});