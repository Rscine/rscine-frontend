'use strict';

describe('Service: basicAuthentication', function () {

  // instantiate service
  var basicAuthentication,
    init = function () {
      inject(function (_basicAuthentication_) {
        basicAuthentication = _basicAuthentication_;
      });
    };

  // load the service's module
  beforeEach(module('rscineFrontendApp'));

  it('should do something', function () {
    init();

    expect(!!basicAuthentication).toBe(true);
  });

  it('should be configurable', function () {
    module(function (basicAuthenticationProvider) {
      basicAuthenticationProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(basicAuthentication.greet()).toEqual('Lorem ipsum');
  });

});
