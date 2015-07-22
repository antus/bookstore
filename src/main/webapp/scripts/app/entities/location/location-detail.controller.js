'use strict';

angular.module('bookstoreApp')
    .controller('LocationDetailController', function ($scope, $rootScope, $stateParams, entity, Location) {
        $scope.location = entity;

        $scope.center = {
            lat: 41,
            lng: 8,
            zoom: 3
        };
        $scope.defaults = { scrollWheelZoom: false }

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
                        draggable: false
                    }
                }
            }
        });

        $scope.load = function (id) {
            Location.get({id: id}, function(result) {
                $scope.location = result;
            });
        };
        $rootScope.$on('bookstoreApp:locationUpdate', function(event, result) {
            $scope.location = result;
        });
    });
