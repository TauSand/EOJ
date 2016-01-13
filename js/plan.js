var plan = angular.module('plan', ['databaseservice', 'router']);

plan.controller('planController', function($scope, database, router) {
    var handleVisit =
        function (visit) {
            $scope.generel = visit.citizen.generelinfo;
            $scope.assignments = _.map(visit.assignments, function(assignmentId, index) {
                var assignment = visit.citizen.assignments[assignmentId];
                assignment.titlePopup = false;
                assignment.newHandle = "";
                assignment.link = undefined;
                assignment.openSelectLinkPopup = false;
                _.each(assignment.comments, function(comment) {
                    if(comment.link) {
                        comment.link = _.map(comment.link, function(link) {
                            var result = find(visit, link);
                            if(result.isNew) {
                                assignment.changedLinks = link;
                            }
                            return result;
                        });
                    }
                    assignment.hasChanges = find(assignment.comments, "isNew");
                });
                assignment.addHandle = function() {
                    assignment.titlePopup = true;
                    setTimeout(function() {router.scope.$digest()},10);
                }
                assignment.closePopup = function() {
                    assignment.titlePopup = false;
                    setTimeout(function() {router.scope.$digest()},10);
                }
                assignment.savePopup = function() {
                    assignment.titlePopup = false;
                    database.getDatabase().get(visit.citizen._id).then(function(doc) {
                        doc.assignments[index].comments.push({
                            text: assignment.newHandle,
                            link: assignment.link
                        });
                        database.getDatabase().put(doc).then(function() {
                            assignment.newHandle = "";
                        });
                    });
                    setTimeout(function() {router.scope.$digest()},10);
                }
                assignment.openSelectLinkPopupFunc = function() {
                    assignment.openSelectLinkPopup = true;
                    setTimeout(function() {$scope.$digest()},10);
                }
                assignment.sels = [];
                _.each(visit.assignments, function (assignmentIndex) {
                    var assignmentInner = visit.citizen.assignments[assignmentIndex];
                    _.each(visit.citizen.assesment, function (group) {
                        var category = group.title;
                        for (var i in group.assesments) {
                            if (_.contains(assignmentInner.level1, i)) {
                                assignment.sels.push({
                                    category: category,
                                    name: i,
                                    score: group.assesments[i],
                                    assignment: assignmentInner,
                                    select: function() {
                                        assignment.link = assignmentInner.level1
                                        assignment.openSelectLinkPopup = false;
                                        setTimeout(function() {$scope.$digest()},10);
                                    }
                                });
                            }
                        }
                    });
                });
                return assignment;
            });
            setTimeout(function () {
                $scope.$digest();
            }, 10);
        }

    database.addListener(function() {
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