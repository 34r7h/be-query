(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name query.factory:Data
   *
   * @description
   *
   */
  angular
    .module('query')
    .factory('Data', Data);

  function Data($firebaseObject, $firebaseAuth, State) {
    let DataBase = {};
    DataBase.db = new Firebase('https://queryful.firebaseio.com/');
    DataBase.fb = $firebaseObject(DataBase.db);
    DataBase.auth = $firebaseAuth(DataBase.db);
    console.info(DataBase.db);

    var auth = DataBase.auth.$getAuth();
    if (auth) {
      console.log("Logged in as:", auth.uid);
      State.user = auth;
      DataBase.fb.$loaded().then(()=>{
        console.info('Data.fb[auth.uid]',DataBase.fb[auth.uid], 'ya!');
        DataBase.history = {};
        angular.forEach(DataBase.fb[auth.uid], (entry, key)=>{
          DataBase.history[key] = JSON.parse(entry);
        });
      });
      /*$timeout(()=>{
        console.info('Data.fb[auth.uid]',DataBase.fb[auth.uid], 'ya!');
        DataBase.history = {};
        angular.forEach(DataBase.fb[auth.uid], (entry, key)=>{
          DataBase.history[key] = JSON.parse(entry);
        });
      },5000);*/
    } else {
      console.log("Logged out");
    }

    DataBase.someMethod = () => {
      return 'Data';
    };
    return DataBase;
  }
}());
