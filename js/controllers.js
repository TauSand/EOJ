var main = angular.module('main', ['databaseservice']);

main.controller("mainController", function($scope, database) {
    var MainRouter = Backbone.Router.extend({
        routes: {
            "borger/:name": 'setCitizenName',
            "overblik": "setOverblik",
            "overblik/*": "setOverblik"
        },

        setCitizenName: function(name) {
            database.getDatabase().get(name).then(function(user) {
                $scope.application.header = user.name;
                $scope.application.showOverview = false;
                $scope.$digest();
            });
        },

        setOverblik: function() {
            $scope.application.header = "Mit overblik";
            $scope.application.showOverview = true ;
            $scope.$digest();
        }

    });
    var mainRouter = new MainRouter();

    $scope.application = {
        header: "Mit overblik",
        showOverview: true,
        toOverview: function() {
            mainRouter.navigate("/overblik", {trigger: true});
        }
    };

});