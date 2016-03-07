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
    StateBase.someValue = 'State';
    StateBase.data = {};
    StateBase.someMethod = () => {
      return 'State';
    };
    return StateBase;
  }
}());
