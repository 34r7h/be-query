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

  function Data($firebaseObject) {
    let DataBase = {};
    DataBase.db = new Firebase('https://queryful.firebaseio.com/');
    DataBase.fb = $firebaseObject(DataBase.db);
    console.info(DataBase.db);
    DataBase.someValue = 'Data';
    DataBase.someMethod = () => {
      return 'Data';
    };
    return DataBase;
  }
}());
