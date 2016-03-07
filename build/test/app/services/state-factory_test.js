/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('State', function () {
  var factory = undefined;

  beforeEach(module('query'));

  beforeEach(inject(function (State) {
    factory = State;
  }));

  it('should have someValue be State', function () {
    expect(factory.someValue).toEqual('State');
  });

  it('should have someMethod return State', function () {
    expect(factory.someMethod()).toEqual('State');
  });
});