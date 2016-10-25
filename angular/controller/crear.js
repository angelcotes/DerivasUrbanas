angular.module('vista')
  .controller('crear', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    $scope.cancelar = function(estudiantes){
      $uibModalInstance.close('a');
      $route.reload();
    };
    $scope.crearEstudiante = function(estudiantes){
      if (StorageService.get('dataCurso') != null) {
        $scope.data_emails = [];
        estudiantes.email.forEach(function(email_item){
          $scope.data_emails.push({'email': email_item.text, 'course_id': StorageService.get('dataCurso').id});
        });
        ViewActiv.crearEstudiante({data: $scope.data_emails}, StorageService.get('dataCurso').id).then(
          function success(response) {
            $route.reload();
            alert('Actividad Editada');
            $route.reload();
          },
          function error(response){
            var error = "";
            response.config.data.data.forEach(function(emails){
              error = error + " " + emails.email
            });
            alert('Correos no registrados:' + error);
          }
        );
      } else{
        $route.reload();
        alert('Estudiantes sin curso asignado');
      };
    };
    $scope.editar = function(estudiantes){
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