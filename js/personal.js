var personal = angular.module('personal', ['databaseservice', 'router']);

personal.controller('personalController', function($scope, database, router) {
    router.addToRoute.visit(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(function(visit) {
            $scope.name = visit.citizen.name;
            $scope.age = visit.citizen.age;
            $scope.address = visit.citizen.address;
            $scope.image = visit.citizen.image;
            setTimeout(function() {
                $scope.$digest();
            }, 10);
        });
    });
});

personal.directive('personal', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/personal/personal.html',
        link: function (scope, elem, attrs) {
        }
    }
});