'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name query.factory:Data
   *
   * @description
   *
   */
  angular.module('query').factory('Data', Data);

  function Data($firebaseObject) {
    var DataBase = {};
    DataBase.db = new Firebase('https://queryful.firebaseio.com/');
    DataBase.fb = $firebaseObject(DataBase.db);
    console.info(DataBase.db);
    DataBase.someValue = 'Data';
    DataBase.someMethod = function () {
      return 'Data';
    };
    return DataBase;
  }
})();
//# sourceMappingURL=data-factory.js.map
