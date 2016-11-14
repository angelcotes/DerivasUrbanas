'use strict';

angular.module('vista')
.factory('activityService', function ($http, $location, BASE_URL, StorageService) {
  var data_Credencial = {};
  data_Credencial.mostrarActividades = function (url) {
    var credentials = StorageService.get('headers');
    return $http.get(BASE_URL + url,{'headers': credentials})             
  };
  data_Credencial.mostrar = function(url){
    return $http({
      method: 'GET',
      url: BASE_URL + url,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.mostrarEstudianteActividades = function(url){
    return $http({
      method: 'GET',
      url: BASE_URL + url,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.mostrarGruposEstudiante = function(){
    return $http({
      method: 'GET',
      url: BASE_URL + "users/" + StorageService.get('currentUser').id + "/allGroupStudent",
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.mostrarGrupoEstudiante = function(actividad){
    return $http({
      method: 'GET',
      url: BASE_URL + "users/" + StorageService.get('currentUser').id + "/groupStudent/" + actividad.id,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.iniciarActividad = function(data, estado){
    var data_final = {
      activity_id: data.id,
      id: StorageService.get('currentUser').id,
      time: new Date(Date.now()),
      estado: estado
    }
    return  $http({
      method: 'PUT',
      url: BASE_URL + "users/" + StorageService.get('currentUser').id + '/startActivity',
      data: data_final,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.crear = function(url, data){
    return $http({
      method: 'POST',
      url: BASE_URL + url,
      data: data,
      headers: StorageService.get('headers') 
    })
  };
  data_Credencial.crearCurso = function (dataActivity){
    /*var dataFinal = {
      name: dataActivity.name,
      period: dataActivity.period,
      user_id: StorageService.get('currentUser').id
    };*/
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
  data_Credencial.EliminarActividad = function (url){
    return $http({
      method: 'DELETE',
      url: BASE_URL + url,
      headers: StorageService.get('headers')
    })
  };
  data_Credencial.mostrarGrupos = function (){
    return  $http({
      method: 'GET',
      url: BASE_URL + 'courses/' + StorageService.get('dataActivity').course_nrc + '/activities/' + StorageService.get('dataActivity').id + '/groups',
      headers: StorageService.get('headers')
    })
  }
  data_Credencial.mostrarGruposTodos = function(){
    return $http({
      method: 'GET',
      url: BASE_URL + 'users/' + StorageService.get('currentUser').id + '/AllGroups',
      headers: StorageService.get('headers')
    })
  }
  return data_Credencial;
});