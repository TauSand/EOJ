var assesment = angular.module('assesment', ['databaseservice', 'router']);

assesment.controller('assesmentController', function($scope, database, router) {
    router.addToRoute.assesment(function() {
        var pattern = /borger\/(\d+)/;
        var citizen = pattern.exec(window.location.pathname)[1];
        database.getDatabase().get(citizen).then(function(doc) {

            console.log(doc);

            $scope.all = [];
            _.each(doc.assesment, function(group) {
                var category = group.title;
                for(var i in group.assesments) {
                    $scope.all.push({
                        category: category,
                        name: i,
                        score: group.assesments[i]
                    })
                }
            }),

            setTimeout(function() {
                console.log($scope.all);
                $scope.$digest();
            }, 10)
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