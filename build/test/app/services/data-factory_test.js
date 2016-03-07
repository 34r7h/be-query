/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Data', function () {
  var factory = undefined;

  beforeEach(module('query'));

  beforeEach(inject(function (Data) {
    factory = Data;
  }));

  it('should have someValue be Data', function () {
    expect(factory.someValue).toEqual('Data');
  });

  it('should have someMethod return Data', function () {
    expect(factory.someMethod()).toEqual('Data');
  });
});