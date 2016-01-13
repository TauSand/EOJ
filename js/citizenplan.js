var citizenplan = angular.module('citizenplan', ['databaseservice', 'router']);

citizenplan.controller('citizenplanController', function ($scope, database, router) {
    router.addToRoute.citizenplan(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(function (visit) {
            $scope.$apply(function () {
                $scope.visits = visit.citizen.plan;
            });
        });

    });

});


citizenplan.directive('citizenplan', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/citizenplan/citizenplan.html',
        link: function (scope, elem, attrs) {
        }
    }
});