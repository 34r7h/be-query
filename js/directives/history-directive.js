'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name query.directive:history
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="query">
       <file name="index.html">
        <history></history>
       </file>
     </example>
   *
   */
  angular.module('query').directive('history', history);

  function history() {
    return {
      restrict: 'EA',
      templateUrl: 'directives/history-directive.tpl.html',
      replace: false,
      controllerAs: 'history',
      controller: function controller() {
        var vm = this;
        vm.name = 'history';
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=history-directive.js.map
