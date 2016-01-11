var assignment = angular.module('assignment', ['databaseservice', 'router']);

assignment.controller('assignmentController', function ($scope, database, router) {
    var handleVisit =
        function (visit) {
            $scope.assignments = _.map(visit.assignments, function(assignemntIndex) {
                var result = visit.citizen.assignments[assignemntIndex];
                result.onClick = function() {
                    visit.citizen.assignments[assignemntIndex].done = visit.citizen.assignments[assignemntIndex].done ? false : true;
                    database.getDatabase().put(visit.citizen);
                    setTimeout(function(){
                        $scope.$digest();
                    },10);
                }
                return result;
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


assignment.directive('assignment', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/assignments/assignments.html',
        link: function (scope, elem, attrs) {
        }
    }
});