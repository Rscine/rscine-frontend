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
            Restangular.oneUrl('companies', Restangular.getBaseUrl() + user._links.company.href).get().then(function (company) {
                $scope.user.company = company;
            })
        })
    });
