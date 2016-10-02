'use strict';

angular.module('vista')
.factory('ViewActiv', function ($http, $location, BASE_URL, StorageService) {
  var data_Credencial = {};

  data_Credencial.mostrarCursos = function () {
    var credentials = StorageService.get('headers')
    console.log(credentials);
    return $http.get(BASE_URL + 'courses',{'headers': credentials})
             
  };
  data_Credencial.crearCurso = function (dataCurso){
    $http.post(BASE_URL + 'courses', {'headers:': StorageService.get('headers'), 'data': dataCurso})
      .then(
        function success(response) {
          return response;
        }, function error(response){
          return null;
        }
      );
  };
  return data_Credencial;
});