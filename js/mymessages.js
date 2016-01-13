var mymessages = angular.module('mymessages', ['databaseservice', 'router']);

mymessages.controller('mymessagesController', function ($scope, database, router) {
    var renderMessages = function(messages) {
        //$scope.$apply(function() {
            $scope.messages = [];
        //});
    }
    renderMessages();
});


mymessages.directive('mymessages', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/mymessages/mymessages.html',
        link: function (scope, elem, attrs) {
        }
    }
});
mymessages.directive('myassignments', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/mymessages/myassignments.html',
        link: function (scope, elem, attrs) {
        }
    }
});
