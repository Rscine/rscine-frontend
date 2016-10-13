'use strict';

/**
 * @ngdoc function
 * @name rscineFrontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the rscineFrontendApp
 */
angular.module('rscineFrontendApp')
    .controller('ProfileCtrl', function ($scope, Restangular) {
        Restangular.one('users', 1).get().then(function (user) {
            $scope.user = user;
        })
    });
