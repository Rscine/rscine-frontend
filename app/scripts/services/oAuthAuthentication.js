'use strict';

/**
 * @ngdoc service
 * @name rscineFrontendApp.oauthAuthentication
 * @description
 * # oauthAuthentication
 * Provider in the rscineFrontendApp.
 */
angular.module('rscineFrontendApp')
    .provider('oAuthAuthentication', function () {
        var tokenCookieName = 'token';
        var refreshTokenCookieName = 'refreshToken';

        var accessTokenUrl = 'http://api.rscine.dev/oauth/v2/token';
        var clientId = '1_1ad5fz4ysgiss04go4ccow48csckggc08oswo0g840w8kk8w8s';
        var clientSecret = 'fr0eadkdeyo08kk0okwkgsogo0ws8c0g44sgco84kk8c4sksw';

        function OAuthAuthenticator($cookies, $http) {
            /**
             * Returns the access token from the session
             * @return {string}
             */
            this.getTokenFromSession = function () {
                return $cookies.get(tokenCookieName);
            };

            /**
             * Ask for an access token to the server
             * @return {string|null}
             */
            this.getAccessToken = function () {
                if (this.getRefreshToken()) {
                    return this.getAccessTokenByRefreshToken(this.getRefreshToken());
                } else {
                    return null;
                }
            }

            /**
             * Ask for an access token to the server by providing a refresh token
             * @param  {string} refreshToken
             * @return {string|null}
             */
            this.getAccessTokenByRefreshToken = function (refreshToken) {
                $http({
                    method: 'post',
                    url: accessTokenUrl,
                    data: {
                        'grant_type': 'refresh_token',
                        'client_id': clientId,
                        'client_secret': clientSecret,
                        'refresh_token': refreshToken
                    }
                }).then(function success(response) {
                    this.setToken(response.token);
                    this.setRefreshToken(response.refresh_token);

                    return this.getToken();
                }, function error(response) {
                    return null;
                });
            }

            /**
             * Ask for an access token to the server by providing user credentials
             * @param  {string} username
             * @param  {string} password
             * @return {string|null}
             */
            this.getAccessTokenByCredentials = function (username, password) {
                $http({
                    method: 'post',
                    url: accessTokenUrl,
                    data: {
                        'grant_type': 'password',
                        'client_id': clientId,
                        'client_secret': clientSecret,
                        'username': username,
                        'password': password
                    }
                }).then(function success(response) {
                    this.setToken(response.token);
                    this.setRefreshToken(response.refresh_token);

                    return this.getToken();
                }, function error(response) {
                    return null;
                });
            }

            /**
             * Gets a token either from the session or by asking it to the server
             * @return {string|null}
             */
            this.getToken = function () {
                return this.getTokenFromSession() || this.getAccessToken();
            };

            /**
             * Sets the access token to the session
             */
            this.setToken = function (token) {
                $cookies.put(tokenCookieName, token);
            };

            /**
             * Sets the refresh token to the session
             */
            this.setRefreshToken = function (refreshToken) {
                $cookies.put(refreshTokenCookieName, refreshtoken);
            }

            /**
             * Gets a the refresh token from the session
             * @return {string|null}
             */
            this.getRefreshToken = function () {
                return $cookies.get(refreshTokenCookieName);
            }
        }

        // Method for instantiating
        this.$get = function ($cookies, $http) {
            return new OAuthAuthenticator($cookies, $http);
        };
    });
