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
        $provide.decorator('Restangular', function ($delegate, oAuthAuthentication, $http) {
            $delegate.getBaseUrl = function () {
                return 'http://api.rscine.dev';
            }

            $delegate.setBaseUrl($delegate.getBaseUrl() + '/api/v1');

            $delegate.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
                if (operation == 'get' || operation =='getList') {
                    params['access_token'] = oAuthAuthentication.getToken();

                    return {
                        element: element,
                        headers: headers,
                        params: params,
                        httpConfig: httpConfig
                    }
                }
            })

            $delegate.setErrorInterceptor(function(response, deferred, responseHandler) {
                if(response.status === 401) {
                    oAuthAuthentication.getAccessTokenByRefreshToken(oAuthAuthentication.getRefreshToken()).then(function() {
                        // Repeat the request and then call the handlers the usual way.
                        $http(response.config).then(responseHandler, deferred.reject);
                        // Be aware that no request interceptors are called this way.
                    });

                    return false; // error handled
                }

                return true; // error not handled
            });

            return $delegate;
        });
    });
