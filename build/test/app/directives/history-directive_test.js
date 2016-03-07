/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('history', function () {
  var scope = undefined,
      element = undefined;

  beforeEach(module('query', 'directives/history-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<history></history>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().history.name).toEqual('history');
  });
});