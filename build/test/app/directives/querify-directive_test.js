/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('querify', function () {
  var scope = undefined,
      element = undefined;

  beforeEach(module('query', 'directives/querify-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<querify></querify>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().querify.name).toEqual('querify');
  });
});