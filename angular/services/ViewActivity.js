'use strict';

angular.module('vista')
.factory('ViewActiv', function ($http, $location, BASE_URL, StorageService) {
  var data_Credencial = {};
  var url = 'courses';

  data_Credencial.mostrarCursos = function () {
    var credentials = StorageService.get('headers');
    return $http.get(BASE_URL + url,{'headers': credentials})             
  };
  data_Credencial.mostrarEstudianteCursos = function(){
    return $http({
      method: 'GET',
      url: BASE_URL + 'users/' + StorageService.get('currentUser').id + '/courses',
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.miembros = function(grupo){
    return $http({
      method: 'GET',
      url: BASE_URL + "users/" + grupo + "/members",
      headers: StorageService.get('headers')
    });
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
  data_Credencial.crearActividad = function (dataActvidad, course_id){
    return $http({
      method: 'POST',
      url: BASE_URL + 'courses/' + course_id + '/activities',
      data: dataActvidad,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.editarActividad = function (dataActvidad) {
    return $http({
      method: 'PUT',
      url: BASE_URL + 'courses/' + dataActvidad.course_nrc + '/activities/' + dataActvidad.id,
      data: dataActvidad,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.crearEstudiante = function(dataEstudiante, course_id){
    return $http({
      method: 'POST',
      url: BASE_URL + 'courses/' + course_id + '/students',
      data: dataEstudiante,
      headers: StorageService.get('headers')
    })
  }
  data_Credencial.EliminarCurso = function (dataCurso){
    return $http.delete(BASE_URL + url + '/' + dataCurso.id, {'headers': StorageService.get('headers'), 'data': dataCurso})
  };
  data_Credencial.crearGrupo = function(dataGrupo){
    return $http({
      method: 'POST',
      url: BASE_URL +  'courses/' + StorageService.get('dataCurso').nrc + '/activities/' + StorageService.get('dataActivity').id + '/groups',
      data: dataGrupo,
      headers: StorageService.get('headers')  
    })
  };
  return data_Credencial;
});