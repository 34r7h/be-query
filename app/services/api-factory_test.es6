/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Api', () => {
  let factory;

  beforeEach(module('query'));

  beforeEach(inject((Api) => {
    factory = Api;
  }));

  it('should have someValue be Api', () => {
    expect(factory.someValue).toEqual('Api');
  });

  it('should have someMethod return Api', () => {
    expect(factory.someMethod()).toEqual('Api');
  });
});
