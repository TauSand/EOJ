var plan = angular.module('plan', ['databaseservice', 'router']);

plan.controller('planController', function($scope, database, router) {
    var handleVisit =
        function (visit) {
            $scope.assignments = _.map(visit.assignments, function(assignmentId) {
                return visit.citizen.assignments[assignmentId];
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