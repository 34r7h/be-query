/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('querify', () => {
  let scope
    , element;

  beforeEach(module('query', 'directives/querify-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<querify></querify>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().querify.name).toEqual('querify');
  });
});
