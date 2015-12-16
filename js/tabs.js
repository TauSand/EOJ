angular.module('tabsModule', [])
    .controller('tabController', function ($scope) {
        $scope.onTap = function () {
            alert("onTap");
        }
        $scope.sizes = {};
        $scope.selections = {
            selectedTab: 0
        };
        $scope.parentProperty = "ciao";
    })

    .service('countChildren', function () {
        var childrenCount = 0;
        return {
            count: function (element) {
                childrenCount = element.children().children().length;
                return childrenCount;
            }
        }
    })

    .directive('notificationbar', ['countChildren', function (countChildren) {
        return {
            restrict: 'E',
            transclude: true, templateUrl: 'templates/tabs/notificationbar.html',

        }
    }])

    .directive('barbutton', function () {
        return {
            scope: {
                icon: '@',
                notifications: '@',
                tabNumber: '@',
                selectedTab: '=',
                selections: '='
            },
            restrict: 'E',
            templateUrl: 'templates/tabs/barbutton.html',
            link: function (scope) {
                scope.onClick = function () {
                    scope.selections.selectedTab = scope.tabNumber
                }
            }
        }
    })

    .directive('tabscontainer', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'templates/tabs/tabscontainer.html',
            link: function (scope, element) {
                var children = element.children().children().children().length;
                scope.sizes.tabsWidth = (100 / children) + "%";
                scope.sizes.width = (100 * children) + "%";
                /*                console.log("tabcontainer");
                 console.log(scope);*/
            }
        }
    })

    .directive('tab', function () {
        return {
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/tabs/tab.html',
            link: function (scope) {
                console.log(scope.tabNumber)
            }
        }
    });



