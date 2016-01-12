var plan = angular.module('plan', ['databaseservice', 'router']);

plan.controller('planController', function($scope, database, router) {
    var handleVisit =
        function (visit) {
            $scope.assignments = _.map(visit.assignments, function(assignmentId, index) {
                var assignment = visit.citizen.assignments[assignmentId];
                assignment.titlePopup = false;
                assignment.newHandle = "";
                assignment.addHandle = function() {
                    assignment.titlePopup = true;
                    setTimeout(function() {router.scope.$digest()},10);
                }
                assignment.closePopup = function() {
                    assignment.titlePopup = false;
                    setTimeout(function() {router.scope.$digest()},10);
                }
                assignment.savePopup = function() {
                    assignment.titlePopup = false;
                    visit.citizen.assignments[index].comments.push({
                       text: assignment.newHandle
                    });
                    database.getDatabase().put(visit.citizen).then(function() {
                        assignment.newHandle = "";
                    });
                    setTimeout(function() {router.scope.$digest()},10);
                }
                return assignment;
            });
            setTimeout(function () {
                $scope.$digest();
            }, 10);
        }

    database.addListener(function() {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(handleVisit);
    });

    router.addToRoute.visit(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(handleVisit);
    });
});

careplan.directive('plan', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/plan/plan.html',
        link: function (scope, elem, attrs) {
        }
    }
});