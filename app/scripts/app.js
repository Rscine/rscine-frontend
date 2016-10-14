'use strict';

/**
 * @ngdoc overview
 * @name rscineFrontendApp
 * @description
 * # rscineFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('rscineFrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'restangular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
        resolve: {
          auth: function (basicAuthentication) {
            return basicAuthentication.isLoggedIn();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/offers', {
        templateUrl: 'views/offers.html',
        controller: 'OffersCtrl',
        controllerAs: 'offers',
        resolve: {
          auth: function (basicAuthentication) {
            return basicAuthentication.isLoggedIn();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
      $location.path("/login");
    });
  });
