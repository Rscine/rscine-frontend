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

            $delegate.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
                if (operation == 'get') {
                    params['access_token'] = oAuthAuthentication.getToken();

                    return {
                        element: element,
                        headers: headers,
                        params: params,
                        httpConfig: httpConfig
                    }
                }
            })

            return $delegate;
        });
    });
