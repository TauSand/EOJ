var dropdown = angular.module('dropdown', []);

dropdown.directive('dropdown', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: '/eoj/templates/dropdown/dropdown.html',
        link: function (scope, elem, attrs) {
            scope.open = false;
            scope.onClick = function() {
                setTimeout(function() {
                    scope.open = !scope.open;
                    scope.$digest();
                },10);

            }
            $(window).click(function(e) {
                if(scope.open && !_.contains($(e.target).parents().toArray(), $(elem[0]).children()[0])) {
                    scope.open = false;
                    setTimeout(function(){
                        scope.$digest();
                    },10);
                }
            });
        }
    }
});

dropdown.directive('dropdownitem', function () {
    return {
        restrict: 'E',
        scope: {
            'onClick': '='
        },
        transclude: true,
        templateUrl: '/eoj/templates/dropdown/dropdownitem.html',
        link: function (scope, elem, attrs) {
        }
    }
});