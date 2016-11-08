'use strict';

angular.module('vista')
  .controller('createGroupCtrl', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    $scope.crearGrupoModal = function(){
      if (StorageService.get('dataCurso') != undefined && StorageService.get('dataActivity') != undefined){
        console.log($scope.grupo);
        ViewActiv.crearGrupo($scope.grupo).then(
          function success(response) {
            alert('Grupo creado');
            $route.reload();
            $location.path("groups");
          }, function error(response){
            $route.reload();
            alert('Usuario no autorizado');
          }
        );
      }
      else{
        alert('Grupo sin curso y actividad asignada');
      }
      $uibModalInstance.close('a');
  	};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});