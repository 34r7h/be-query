/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('auth', () => {
  let scope
    , element;

  beforeEach(module('query', '/auth-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<auth></auth>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().auth.name).toEqual('auth');
  });
});
