angular.module('vista')
  .controller('crearOne', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, AuthService, ngNotify) {
    $scope.crearEstudiante = function(dataStudent){
      AuthService.addManyUsers(dataStudent, StorageService.get('dataCurso').id).then(
        function success(response) {
          ngNotify.set('Estudiante agregado', 'success');
          $uibModalInstance.close('a');
          $route.reload();
        }, function error(error){
          ngNotify.set(response.data.error, 'error');
          alert(error);
        }
      );

    };
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});