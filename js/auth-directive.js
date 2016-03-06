'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name query.directive:auth
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="query">
       <file name="index.html">
        <auth></auth>
       </file>
     </example>
   *
   */
  angular.module('query').directive('auth', auth);

  function auth() {
    return {
      restrict: 'EA',
      templateUrl: '/auth-directive.tpl.html',
      replace: false,
      controllerAs: 'auth',
      controller: function controller() {
        var vm = this;
        vm.name = 'auth';
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=auth-directive.js.map
