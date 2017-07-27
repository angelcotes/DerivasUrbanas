'use strict';

angular.module('vista')
  .controller('createGroupCtrl', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, ngNotify) {
    $scope.crearGrupoModal = function(){
      if (StorageService.get('dataCurso') != undefined && StorageService.get('dataActivity') != undefined){
        console.log($scope.grupo);
        ViewActiv.crearGrupo($scope.grupo).then(
          function success(response) {
            ngNotify.set('Grupo creado', 'success');
            $route.reload();
            $location.path("groups");
          }, function error(response){
            $route.reload();
            ngNotify.set(response.data.error, 'error');
          }
        );
      }
      else{
        ngNotify.set('Grupo sin curso y actividad asignado', 'info');
      }
      $uibModalInstance.close('a');
  	};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});