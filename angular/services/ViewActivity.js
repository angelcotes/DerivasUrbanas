'use strict';

angular.module('vista')
.factory('ViewActiv', function ($http, $rootScope, $location, BASE_URL, StorageService) {
  var date_Credencial = {};

  date_Credencial.getCredencial = function () {
    var credentials = StorageService.get('headers')
    console.log(credentials);
    $http.get(BASE_URL + 'courses',{'headers': credentials})
      .then(
        function success(response) {
          date_Credencial = response;
        }, function error(response) {
          console.log(response);
        }
      );       
  };
  return date_Credencial;
});