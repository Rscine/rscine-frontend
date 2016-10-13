'use strict';

/**
 * @ngdoc function
 * @name rscineFrontendApp.decorator:Restangular
 * @description
 * # Restangular
 * Decorator of the rscineFrontendApp
 */
angular.module('rscineFrontendApp')
    .config(function ($provide) {
        $provide.decorator('Restangular', function ($delegate, oAuthAuthentication) {
            $delegate.setBaseUrl('http://api.rscine.dev/api/v1');

            $delegate.addFullRequestInterceptor(function (element, operation, what, url) {
                console.log(element, operation, what, url);
                if (operation == 'get') {
                    return {
                        params: {
                            access_token: oAuthAuthentication.getToken()
                        }
                    }
                }
            })

            return $delegate;
        });
    });
