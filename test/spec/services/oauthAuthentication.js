'use strict';

describe('Service: oauthAuthentication', function () {

  // instantiate service
  var oauthAuthentication,
    init = function () {
      inject(function (_oauthAuthentication_) {
        oauthAuthentication = _oauthAuthentication_;
      });
    };

  // load the service's module
  beforeEach(module('rscineFrontendApp'));

  it('should do something', function () {
    init();

    expect(!!oauthAuthentication).toBe(true);
  });

  it('should be configurable', function () {
    module(function (oauthAuthenticationProvider) {
      oauthAuthenticationProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(oauthAuthentication.greet()).toEqual('Lorem ipsum');
  });

});
