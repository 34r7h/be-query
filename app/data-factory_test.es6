/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Data', () => {
  let factory;

  beforeEach(module('query'));

  beforeEach(inject((Data) => {
    factory = Data;
  }));

  it('should have someValue be Data', () => {
    expect(factory.someValue).toEqual('Data');
  });

  it('should have someMethod return Data', () => {
    expect(factory.someMethod()).toEqual('Data');
  });
});
