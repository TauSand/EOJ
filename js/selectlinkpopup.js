var selectlinkpopup = angular.module('selectlinkpopup', []);

selectlinkpopup.directive('selectlinkpopup', function () {
    return {
        restrict: 'E',
        scope: {
            open: '=',
            presentSel: '='
        },
        templateUrl: '/eoj/templates/selectlinkpopup/selectlinkpopup.html',
        link: function (scope, elem, attrs) {
            scope.onSave = function() {
                scope.$apply(function() {
                    scope.open = false;
                });
            }
            scope.onCancel = function() {
                scope.$apply(function() {
                    scope.open = false;
                });
            }

            scope.relevantSel = _.map(scope.presentSel, function(sel) {
                return sel;
            });

        }
    }
});