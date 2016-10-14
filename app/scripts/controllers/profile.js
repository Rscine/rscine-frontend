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
        Restangular.one('users', 'me').get().then(function (user) {
            $scope.user = user;
            Restangular.one('companies', user._links.company.id).get().then(function (company) {
                $scope.user.company = company;
            })
        })
    });
