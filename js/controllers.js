var main = angular.module('main', ['databaseservice']);

main.controller("mainController", function($scope, citizen) {
    citizen.addListener(function(doc) {
        $scope.citizen = doc;
        $scope.$digest()
    });
    citizen.getCitizen().then (function(doc) {
        $scope.citizen = doc;
        $scope.$digest()
    });
});