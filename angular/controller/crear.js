angular.module('vista')
  .controller('crear', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    $scope.cancelar = function(estudiantes){
      $uibModalInstance.close('a');
      $route.reload();
    };
    $scope.crearEstudiante = function(estudiantes){
      if (StorageService.get('dataCurso') != null) {
        estudiantes.email.forEach(function(email_item){
          var data = {
            email: email_item.text,
            course_id: StorageService.get('dataCurso').id
          }
          ViewActiv.crearEstudiante(data).then(
            function success(response) {
            }, function error(response){
            }
          );
        });
      } else{
        $route.reload();
        alert('Estudiantes sin curso asignado');
      };
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