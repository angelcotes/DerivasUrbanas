angular.module('vista')
  .controller('crear', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    console.log($scope);
    $scope.cancelar = function(estudiantes){
      $uibModalInstance.close('a');
    };
    $scope.crearEstudiante = function(estudiantes){
      console.log(estudiantes);
      var data = {
        email: estudiantes.email,
        course_id: StorageService.get('dataCurso').id
      }
      ViewActiv.crearEstudiante(data).then(
        function success(response) {
          $route.reload();
          alert('Estudiantes agregados al curso');
          $route.reload();
        }, function error(response){
          $route.reload();
          alert('problemas con los datos');
        }
      );
    };
    $scope.editar = function(estudiantes){
      console.log(actividad);
      ViewActiv.editarActividad(actividad).then(
        function success(response) {
          $route.reload();
          alert('Actividad Editada');
          $route.reload();
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
    };
});