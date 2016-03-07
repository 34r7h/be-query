(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name query.factory:State
   *
   * @description
   *
   */
  angular
    .module('query')
    .factory('State', State);

  function State() {
    let StateBase = {};
    StateBase.data = {};

    return StateBase;
  }
}());
