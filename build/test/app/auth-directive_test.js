/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('auth', function () {
  var scope = undefined,
      element = undefined;

  beforeEach(module('query', '/auth-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<auth></auth>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().auth.name).toEqual('auth');
  });
});