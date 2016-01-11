var assesment = angular.module('assesment', ['databaseservice', 'router']);

assesment.controller('assesmentController', function ($scope, database, router) {
    router.addToRoute.assesment(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(function (visit) {
            $scope.all = [];
            $scope.important = [];
            _.each(visit.assignments, function (assignmentIndex) {
                var assignment = visit.citizen.assignments[assignmentIndex];
                _.each(visit.citizen.assesment, function (group) {
                    var category = group.title;
                    for (var i in group.assesments) {
                        if (_.contains(assignment.level1, i)) {
                            $scope.important.push({
                                category: category,
                                name: i,
                                score: group.assesments[i]
                            });
                        }
                    }
                });
            });
            _.each(visit.citizen.assesment, function (group) {
                var category = group.title;
                for (var i in group.assesments) {
                    $scope.all.push({
                        category: category,
                        name: i,
                        score: group.assesments[i]
                    });
                }
            });

            setTimeout(function () {
                $scope.$digest();
            }, 10);
        });

    });

});


assesment.directive('assesment', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/assesment/assesment.html',
        link: function (scope, elem, attrs) {
        }
    }
});