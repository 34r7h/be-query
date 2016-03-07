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

  function Data($firebaseObject, $firebaseAuth, State) {
    var DataBase = {};
    DataBase.db = new Firebase('https://queryful.firebaseio.com/');
    DataBase.fb = $firebaseObject(DataBase.db);
    DataBase.auth = $firebaseAuth(DataBase.db);

    var auth = DataBase.auth.$getAuth();
    if (auth) {
      console.info("Logged in as:", auth.uid);
      State.user = auth;
      DataBase.fb.$loaded().then(function () {
        !DataBase.fb[auth.uid] ? (DataBase.fb[auth.uid] = { created: Date.now() }, DataBase.fb.$save()) : null;
        DataBase.history = {};
        angular.forEach(DataBase.fb[auth.uid].history, function (entry, key) {
          DataBase.history[key] = JSON.parse(entry);
        });
      });
    } else {
      console.info("Logged out");
    }
    return DataBase;
  }
})();
//# sourceMappingURL=data-factory.js.map
