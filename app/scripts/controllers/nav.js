'use strict';

/**
 * @ngdoc function
 * @name rscineFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rscineFrontendApp
 */
angular.module('rscineFrontendApp')
    .controller('NavCtrl', function ($scope, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            }
        }
    });
