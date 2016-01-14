var fab = angular.module('fab', ['databaseservice', 'router']);

fab.controller('fabController', function ($scope, database, router) {
    var pattern = /besoeg\/(\d+)/;
    var visitId = pattern.exec(window.location.pathname)[1];
    database.getVisit(visitId).then(function (visit) {
        $scope.$apply(function () {
            $scope.open = false;
            $scope.openObservation = false;
            $scope.values = {
                observationText: "",
                observationLink: undefined,
                observationSelect: false
            }

            var sulObservation = _.map(visit.citizen.sul, function (category) {
                var result = [];
                for (var i in category.states) {
                    if (category.states[i].precision) {
                        var res = i + "";
                        result.push({
                            category: category.title,
                            term: res + "",
                            precision: category.states[i].precision,
                            comments: category.states[i].comments,
                            isNew: category.states[i].isNew,
                            select: function () {
                                $scope.$apply(function() {
                                    $scope.values.observationLink = res
                                    $scope.values.observationSelect = false;
                                    setTimeout(function () {
                                        $scope.$digest()
                                    }, 10);
                                });
                            }
                        });
                    }
                }
                return result;
            });

            $scope.suls =  [].concat.apply([], sulObservation);

            $scope.openObservationFunc = function () {
                $scope.$apply(function () {
                    $scope.openObservation = true;
                });
            }

            $scope.closeObservation = function () {
                $scope.$apply(function () {
                    $scope.openObservation = false;
                });
            }
            $scope.saveObservation = function () {
                database.getDatabase().get(visit.citizen._id).then(function (citizen) {
                    _.each(citizen.sul, function (category) {
                        for(i in category.states) {
                            if(i == $scope.values.observationLink) {
                                category.states[i].comments.push($scope.values.observationText);
                            }
                        }
                    });
                    database.getDatabase().put(citizen).then(function() {
                        $scope.$apply(function () {
                            $scope.values.observationLink = undefined,
                            $scope.values.observationText = ""
                            $scope.openObservation = false;
                        });
                    });
                });

            }

            $scope.openObservationSelect = function () {
                $scope.$apply(function () {
                    $scope.values.observationSelect = true;
                });
            }
            $scope.openFab = function () {
                $scope.$apply(function () {
                    $scope.open = true;
                });
            };
            $scope.closeFab = function () {
                $scope.open = false;
            };

        });
    });

});

fab.directive('fab', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/fab/fab.html',
        link: function (scope, elem, attrs) {
        }
    }
});