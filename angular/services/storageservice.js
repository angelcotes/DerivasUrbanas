'use strict';

angular.module('vista')
  .factory('StorageService', function ($localStorage, $sessionStorage, $rootScope) {
    var storageService = {};

    storageService.get = function (key) {
      var storageType = $rootScope.dataShouldPersist ? $localStorage : $sessionStorage;
      return storageType[key];
    };

    storageService.set = function (key, value) {
      var storageType = $rootScope.dataShouldPersist ? $localStorage : $sessionStorage;
      storageType[key] = value;
    };

    storageService.clean = function (key) {
      var storageType = $rootScope.dataShouldPersist ? $localStorage : $sessionStorage;
      delete storageType[key];
    };

    storageService.clear = function () {
      $localStorage.$reset();
      $sessionStorage.$reset();
    }

    return storageService;
  });