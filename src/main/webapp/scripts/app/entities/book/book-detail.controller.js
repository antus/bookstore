'use strict';

angular.module('bookstoreApp')
    .controller('BookDetailController', function ($scope, $rootScope, $stateParams, entity, Book, Author) {
        $scope.book = entity;
        $scope.load = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
            });
        };
        $rootScope.$on('bookstoreApp:bookUpdate', function(event, result) {
            $scope.book = result;
        });
    });
