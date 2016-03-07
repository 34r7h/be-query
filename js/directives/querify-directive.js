'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name query.directive:querify
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="query">
       <file name="index.html">
        <querify></querify>
       </file>
     </example>
   *
   */
  angular.module('query').directive('querify', querify);

  function querify() {
    return {
      restrict: 'EA',
      templateUrl: 'directives/querify-directive.tpl.html',
      replace: false,
      controllerAs: 'querify',
      controller: function controller() {
        var vm = this;
        vm.name = 'querify';
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=querify-directive.js.map
