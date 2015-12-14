var tabsModule = angular.module('tabsModule', []);

tabsModule.directive('notificationbar', function () {
    return {
        scope: {},
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/notificationbar.html'
    }
});


tabsModule.directive('barbutton', function () {
    return {
        scope: {
            icon: '@',
            notifications: '@'
        },
        restrict: 'E',
        templateUrl: 'templates/barbutton.html'
    }
});

tabsModule.directive('tabscontainer', function () {
    return {
        scope: {},
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/tabscontainer.html'
    }
});

tabsModule.directive('tab', function () {
    return {
                scope: {
         tabname : '@'
         } ,
        restrict: 'E',
        templateUrl: 'templates/tab.html'
    }
});

