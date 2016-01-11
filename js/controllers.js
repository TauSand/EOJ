var main = angular.module('main', ['databaseservice', 'router']);

main.controller("mainController", function($scope, database, router) {
    router.scope = $scope;
    var setCitizenName = function(name) {
        database.getVisit(name).then(function(visit) {
            $scope.application.header = visit.citizen.name;
            $scope.application.showOverview = false;
        });
    }

    var setOverblik = function() {
        $scope.application.header = "Mit overblik";
        $scope.application.showOverview = true ;
    }

    router.addToRoute.overview(setOverblik);
    router.addToRoute.visit(setCitizenName);


    $scope.application = {
        header: "Mit overblik",
        showOverview: true,
        toOverview: function() {
            router.navigate("/overblik", {trigger: true});
        },
        citizenAssesment: function() {
            var pattern = /besoeg\/(\d+)/;
            var visit = pattern.exec(window.location.pathname)[1];
            return "besoeg/" + visit + "/vurdering"
        }
    };

});