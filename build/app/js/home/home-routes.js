'use strict';

(function () {
  'use strict';

  angular.module('home').config(config);

  function config($stateProvider) {
    $stateProvider.state('search', {
      url: '/search',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    });
  }
})();
//# sourceMappingURL=home-routes.js.map
