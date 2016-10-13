'use strict';

/**
 * @ngdoc service
 * @name rscineFrontendApp.basicAuthentication
 * @description
 * # basicAuthentication
 * Provider in the rscineFrontendApp.
 */
angular.module('rscineFrontendApp')
    .provider('basicAuthentication', function () {
        var sessionStateCookieName = 'logged';

        function BasicAuthenticator($cookies, $q, oAuthAuthentication) {
            this.authenticate = function (username, password) {
                return oAuthAuthentication.authenticate(username, password).then(function () {
                    $cookies.put(sessionStateCookieName, true);

                    return $q.resolve();
                });
            };

            this.invalidateSession = function () {
                $cookies.remove(sessionStateCookieName);
                // @todo remove the token and refresh tokens as well
            }
        }

        // Method for instantiating
        this.$get = function ($cookies, $q, oAuthAuthentication) {
            return new BasicAuthenticator($cookies, $q, oAuthAuthentication);
        };
    });
