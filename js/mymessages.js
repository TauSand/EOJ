var mymessages = angular.module('mymessages', ['databaseservice', 'router']);

mymessages.controller('mymessagesController', function ($scope, database, router) {
    var renderMessages = function(outbox) {
        $scope.$apply(function() {
            var promises = _.map(outbox.messages, function(message) {
                return new Promise(function(fulfill, reject) {
                    database.getDatabase().get(message.citizen).then(function(citizen) {
                        fulfill({
                            text: message.text,
                            citizen: citizen.name
                        })
                    });
                });
            })
            Promise.all(promises).then(function(messages) {
                $scope.$apply(function() {
                    $scope.messages = messages;
                });
            });
        });
    }
    database.getDatabase().get("outbox").then(renderMessages);
    database.addListener(function() {database.getDatabase().get("outbox").then(renderMessages)});
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
