angular.module('tabsModule', [])
    .controller('tabController', ['$scope', function(scope) {
        scope.sizes = {};
        scope.selections = {};
        scope.selections.selectedTab = 1;



    }])

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
            scope: {},
            restrict: 'E',
            transclude: true, templateUrl: 'templates/tabs/notificationbar.html',

        }
    }])

    .directive('barbutton', function () {
        return {
            scope: {
                icon: '@',
                notifications: '@',
                tabNumber: '@'
            },
            restrict: 'E',
            templateUrl: 'templates/tabs/barbutton.html',
            link: function(scope) {
                console.log(scope);
                scope.onClick = function () {
                    window.alert('click')
                }
            }
        }
    })

    .directive('tabscontainer', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'templates/tabs/tabscontainer.html',
            link: function(scope, element) {
                var children = element.children().children().children().length;
                scope.sizes.tabsWidth = (100 / children) + "%";
                scope.sizes.width = (100 *  children)+ "%";
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
            link: function(scope) {
/*                console.log("tab");
                console.log(scope);*/
            }
        }
    });



