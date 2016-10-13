'use strict';

describe('Service: oAuthAuthentication', function () {

  // instantiate service
  var oAuthAuthentication,
    init = function () {
      inject(function (_oAuthAuthentication_) {
        oAuthAuthentication = _oAuthAuthentication_;
      });
    };

  // load the service's module
  beforeEach(module('rscineFrontendApp'));

  it('should do something', function () {
    init();

    expect(!!oAuthAuthentication).toBe(true);
  });

  it('should be configurable', function () {
    module(function (oAuthAuthenticationProvider) {
      oAuthAuthenticationProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(oAuthAuthentication.greet()).toEqual('Lorem ipsum');
  });

});
