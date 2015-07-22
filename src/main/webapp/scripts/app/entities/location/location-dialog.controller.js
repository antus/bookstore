'use strict';

angular.module('bookstoreApp').controller('LocationDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Location',
        function($scope, $stateParams, $modalInstance, entity, Location) {

        $scope.location = entity;

        $scope.center = {
                    lat: 41,
                    lng: 8,
                    zoom: 3
                };
        $scope.defaults = { scrollWheelZoom: false }
        if ($scope.location.$promise) {
            $scope.location.$promise.then(function (result) {
                $scope.location = result;

                if (result.geom!=null && result.geom.coordinates!=null) {
                    $scope.center = {
                        lat: $scope.location.geom.coordinates[1],
                        lng: $scope.location.geom.coordinates[0],
                        zoom: 10
                    };
                    $scope.markers = {
                        theMarker: {
                            lat: $scope.location.geom.coordinates[1],
                            lng: $scope.location.geom.coordinates[0],
                            message: "Location: " + result.name,
                            focus: true,
                            draggable: true
                        }
                    }
                }
            });
        } else {
            $scope.location = {
                name: "",
                description: "",
                geom: {
                    "type": "Point",
                    "coordinates":[12.49,41.89]
                }
            };
            $scope.center = {
                lat: $scope.location.geom.coordinates[1],
                lng: $scope.location.geom.coordinates[0],
                zoom: 10
            };
            $scope.markers = {
                theMarker: {
                    lat: $scope.location.geom.coordinates[1],
                    lng: $scope.location.geom.coordinates[0],
                    message: "Location: " + $scope.location.name,
                    focus: true,
                    draggable: true
                }
            };
        }

        $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
            $scope.location.geom.coordinates[1] = args.model.lat;
            $scope.location.geom.coordinates[0] = args.model.lng;

        });



        $scope.load = function(id) {
            Location.get({id : id}, function(result) {
                $scope.location = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('bookstoreApp:locationUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.location.id != null) {
                Location.update($scope.location, onSaveFinished);
            } else {
                Location.save($scope.location, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
