var sul = angular.module('sul', ['databaseservice', 'router']);

sul.controller('sulController', function ($scope, database, router) {
    router.addToRoute.sul(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(function (visit) {
            $scope.$apply(function() {
                var sul = _.map(visit.citizen.sul, function(category) {
                    var result = [];
                    for(var i in category.states) {
                        if(category.states[i].precision) {
                            result.push({
                                category: category.title,
                                term: i,
                                precision: category.states[i].precision,
                                comments: category.states[i].comments
                            });
                        }
                    }
                    return result;
                });
                var sul = [].concat.apply([], sul);
                $scope.sul = sul;
                console.log(sul);
            });

        });

    });

});


sul.directive('sul', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/sul/sul.html',
        link: function (scope, elem, attrs) {
        }
    }
});