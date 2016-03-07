'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name query.factory:State
   *
   * @description
   *
   */
  angular.module('query').factory('State', State);

  function State() {
    var StateBase = {};
    StateBase.someValue = 'State';
    StateBase.data = {};
    StateBase.someMethod = function () {
      return 'State';
    };
    return StateBase;
  }
})();
//# sourceMappingURL=state-factory.js.map
