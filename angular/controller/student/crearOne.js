angular.module('vista')
  .controller('crearOne', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, AuthService) {
    $scope.crearEstudiante = function(dataStudent){
      AuthService.addManyUsers(dataStudent, StorageService.get('dataCurso').id).then(
        function success(response) {
          $uibModalInstance.close('a');
          $route.reload();
        }, function error(error){
          alert(error);
        }
      );

    };
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});