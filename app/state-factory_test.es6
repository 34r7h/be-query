/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('State', () => {
  let factory;

  beforeEach(module('query'));

  beforeEach(inject((State) => {
    factory = State;
  }));

  it('should have someValue be State', () => {
    expect(factory.someValue).toEqual('State');
  });

  it('should have someMethod return State', () => {
    expect(factory.someMethod()).toEqual('State');
  });
});
