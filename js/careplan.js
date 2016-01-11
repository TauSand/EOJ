var careplan = angular.module('careplan', ['databaseservice']);

careplan.controller('careplanController', function($scope, database) {
    database.getDatabase().query({
        map: function(doc) {
            if(doc.type == "visit") {
                emit(doc);
            }
        }
    }, {inlcude_docs: true}).then(function(docs) {
        var promises = _.map(docs.rows, function(row) {
            return new Promise(function(fulfill, reject) {
                var promise = database.getDatabase().get(row.key.citizen);
                promise.then(function(citizen) {
                    var result = row.key;
                    result.citizen = citizen;
                    fulfill(result);
                }).catch(function(e) {
                    reject(e);
                });

            });
        });
        Promise.all(promises).then(function(visits) {
            var prevVisit;
            var resultVisits = [];
            _.each(visits, function(visit) {
                if(prevVisit) {
                    var start = prevVisit.end.split(":");
                    var end = visit.start.split(":");
                    resultVisits.push({
                        transportationTime: (parseInt(end[0]) - parseInt(start[0])) * 60 + parseInt(end[1]) - parseInt(start[1])
                    });
                }
                visit.open = function() {
                    (new Backbone.Router()).navigate('besoeg/'+visit._id,{trigger: true});
                }
                resultVisits.push(visit);
                prevVisit = visit;
            });
            $scope.visits = resultVisits;
            $scope.$digest();
        });

    });

});


careplan.directive('careplan', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/careplan/careplan.html',
        link: function (scope, elem, attrs) {
            scope.onTap = function() {
            }
            scope.open = false;
            scope.openClick = function () {
                scope.open = true;
            }
        }
    }
});