var main = angular.module('main', ['databaseservice', 'router']);

main.controller("mainController", function($scope, database, router) {
    router.scope = $scope;
    var setCitizenName = function(name) {
        database.getDatabase().get(name).then(function(user) {
            $scope.application.header = user.name;
            $scope.application.showOverview = false;
        });
    }

    var setOverblik = function() {
        $scope.application.header = "Mit overblik";
        $scope.application.showOverview = true ;
    }

    router.addToRoute.overview(setOverblik);
    router.addToRoute.citizen(setCitizenName);


    $scope.application = {
        header: "Mit overblik",
        showOverview: true,
        toOverview: function() {
            router.navigate("/overblik", {trigger: true});
        },
        citizenAssesment: function() {
            var pattern = /borger\/(\d+)/;
            var citizen = pattern.exec(window.location.pathname)[1];
            return "borger/" + citizen + "/vurdering"
        }
    };

});