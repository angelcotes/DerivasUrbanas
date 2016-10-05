'use strict';

angular.module('vista')
.factory('activityService', function ($http, $location, BASE_URL, StorageService) {
  var data_Credencial = {};
  data_Credencial.mostrarCursos = function (url) {
    var credentials = StorageService.get('headers');
    return $http.get(BASE_URL + url,{'headers': credentials})             
  };
  data_Credencial.crearCurso = function (dataActivity){
    var dataFinal = {
      name: dataActivity.name,
      period: dataActivity.period,
      user_id: StorageService.get('currentUser').id
    };
    return $http({
      method: 'POST',
      url: BASE_URL + url,
      data: dataActivity,
      headers: StorageService.get('headers')
    })
  };  
  data_Credencial.editarCurso = function (dataActivity) {
    return $http({
      method: 'PUT',
      url: BASE_URL + url + '/' + dataActivity.id,
      data: dataActivity,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.EliminarCurso = function (dataActivity){
    return $http.delete(BASE_URL + url + '/' + dataActivity.id, {'headers': StorageService.get('headers'), 'data': dataActivity})
  };
  return data_Credencial;
});