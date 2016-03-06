/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Api', function () {
  var factory = undefined;

  beforeEach(module('query'));

  beforeEach(inject(function (Api) {
    factory = Api;
  }));

  it('should have someValue be Api', function () {
    expect(factory.someValue).toEqual('Api');
  });

  it('should have someMethod return Api', function () {
    expect(factory.someMethod()).toEqual('Api');
  });
});