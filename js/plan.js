var plan = angular.module('plan', ['databaseservice', 'router']);

plan.controller('planController', function ($scope, database, router) {
    var handleVisit =
        function (visit) {
            $scope.generel = visit.citizen.generelinfo;
            $scope.assignments = _.map(visit.assignments, function (assignmentId, index) {
                var assignment = visit.citizen.assignments[assignmentId];
                assignment.titlePopup = false;
                assignment.newObservation = false;
                assignment.openSelectLinkPopupObservation = false;
                assignment.newHandle = "";
                assignment.newObservationText = "";
                assignment.observationLink = undefined;
                assignment.link = undefined;
                assignment.openSelectLinkPopup = false;
                _.each(assignment.comments, function (comment) {
                    if (comment.link) {
                        comment.link = _.map(comment.link, function (link) {
                            var result = find(visit, link);
                            if (result && result.isNew) {
                                assignment.changedLinks = link;
                            }
                            return result;
                        });
                    }
                    assignment.hasChanges = find(assignment.comments, "isNew");
                });
                assignment.addHandle = function () {
                    assignment.titlePopup = true;
                    setTimeout(function () {
                        router.scope.$digest()
                    }, 10);
                }
                assignment.closePopup = function () {
                    assignment.titlePopup = false;
                    setTimeout(function () {
                        router.scope.$digest()
                    }, 10);
                }
                assignment.savePopup = function () {
                    assignment.titlePopup = false;
                    database.getDatabase().get(visit.citizen._id).then(function (doc) {
                        doc.assignments[index].comments.push({
                            text: assignment.newHandle,
                            link: assignment.link
                        });
                        database.getDatabase().put(doc).then(function () {
                            assignment.newHandle = "";
                        });
                    });
                    setTimeout(function () {
                        router.scope.$digest()
                    }, 10);
                }
                assignment.closeObservationPopup = function () {
                    assignment.newObservation = false;
                    setTimeout(function () {
                        $scope.$digest()
                    }, 10);
                }
                assignment.saveObservation = function () {
                    database.getDatabase().get(visit.citizen._id).then(function (citizen) {
                        _.each(citizen.sul, function (category) {
                            for(i in category.states) {
                                if(i == assignment.observationLink) {
                                    category.states[i].comments.push(assignment.newObservationText);
                                }
                            }
                        });
                        database.getDatabase().put(citizen).then(function() {
                            $scope.$apply(function () {
                                assignment.observationLink = undefined;
                                assignment.newObservationText = "";
                                assignment.newObservation = false;
                            });
                        });
                    });
                }
                assignment.newObservationOpen = function () {
                    assignment.newObservation = true;
                    setTimeout(function () {
                        $scope.$digest()
                    }, 10);
                }
                assignment.openSelectLinkPopupFunc = function () {
                    assignment.openSelectLinkPopup = true;
                    setTimeout(function () {
                        $scope.$digest()
                    }, 10);
                }
                assignment.openSelectLinkPopupFuncObservation = function () {
                    assignment.openSelectLinkPopupObservation = true;
                    setTimeout(function () {
                        $scope.$digest()
                    }, 10);
                }
                var sul = _.map(visit.citizen.sul, function (category) {
                    var result = [];
                    for (var i in category.states) {
                        if (category.states[i].precision) {
                            var res = i;
                            result.push({
                                category: category.title,
                                term: res,
                                precision: category.states[i].precision,
                                comments: category.states[i].comments,
                                isNew: category.states[i].isNew,
                                select: function () {
                                    assignment.link = res
                                    assignment.openSelectLinkPopup = false;
                                    setTimeout(function () {
                                        $scope.$digest()
                                    }, 10);
                                }
                            });
                        }
                    }
                    return result;
                });
                assignment.suls = [].concat.apply([], sul);
                var sulObservation = _.map(visit.citizen.sul, function (category) {
                    var result = [];
                    for (var i in category.states) {
                        if (category.states[i].precision) {
                            var res = i;
                            result.push({
                                category: category.title,
                                term: res,
                                precision: category.states[i].precision,
                                comments: category.states[i].comments,
                                isNew: category.states[i].isNew,
                                select: function () {
                                    assignment.observationLink = res
                                    assignment.openSelectLinkPopupObservation = false;
                                    setTimeout(function () {
                                        $scope.$digest()
                                    }, 10);
                                }
                            });
                        }
                    }
                    return result;
                });

                assignment.sulObservation = [].concat.apply([], sulObservation);


                return assignment;
            });
            setTimeout(function () {
                $scope.$digest();
            }, 10);
        }

    database.addListener(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(handleVisit);
    });

    router.addToRoute.visit(function () {
        var pattern = /besoeg\/(\d+)/;
        var visitId = pattern.exec(window.location.pathname)[1];
        database.getVisit(visitId).then(handleVisit);
    });
});

careplan.directive('plan', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/plan/plan.html',
        link: function (scope, elem, attrs) {
        }
    }
});