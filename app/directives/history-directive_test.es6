/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('history', () => {
  let scope
    , element;

  beforeEach(module('query', 'directives/history-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<history></history>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().history.name).toEqual('history');
  });
});
