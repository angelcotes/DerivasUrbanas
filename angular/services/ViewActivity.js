'use strict';

angular.module('vista')
.factory('ViewActiv', function ($http, $location, BASE_URL, StorageService) {
  var data_Credencial = {};
  var url = 'courses';

  data_Credencial.mostrarCursos = function () {
    var credentials = StorageService.get('headers');
    return $http.get(BASE_URL + url,{'headers': credentials})             
  };
  data_Credencial.crearCurso = function (dataCurso){
    var dataFinal = {
      name: dataCurso.name,
      period: dataCurso.period,
      user_id: StorageService.get('currentUser').id
    };
    return $http({
      method: 'POST',
      url: BASE_URL + url,
      data: dataCurso,
      headers: StorageService.get('headers')
    })
  };  
  data_Credencial.editarCurso = function (dataCurso) {
    return $http({
      method: 'PUT',
      url: BASE_URL + url + '/' + dataCurso.id,
      data: dataCurso,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.crearActividad = function (dataActvidad){
    return $http({
      method: 'POST',
      url: BASE_URL + 'courses/' + dataActvidad.course_id + '/activities',
      data: dataActvidad,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.EliminarCurso = function (dataCurso){
    return $http.delete(BASE_URL + url + '/' + dataCurso.id, {'headers': StorageService.get('headers'), 'data': dataCurso})
  };
  return data_Credencial;
});