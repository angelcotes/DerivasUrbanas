angular.module('vista')
  .controller('crear', function ($uibModalInstance, $route, $scope, ViewActiv, $location, $route, StorageService, AuthService) {
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
      $route.reload();
    };
    $scope.checkFormat = function(files) {
      //Take the first selected file
      $scope.dataEmails = files[0];
    }
    $scope.crearEstudiante = function(){
      if (StorageService.get('dataCurso') != null) {
        console.log($scope.dataEmails);
        $scope.data_emails = {}
        AuthService.addManyUsers($scope.dataEmails).then(
          function success(response) {
            console.log(response);
            if (response.data.successful_data.length > 0) {
              ViewActiv.crearEstudiante({data: response.data.successful_data}, StorageService.get('dataCurso').id).then(
                function success(response) {
                  $route.reload();
                  $uibModalInstance.close('a');
                  alert('Estudiantes agregados');
                }
              );
            };
            if(response.data.error_data.length > 0){
              var error = "";
              response.data.error_data.forEach(function(emails){
                error = error + " " + emails
              });
              alert('Correos con problemas:' + error);
            };
            $uibModalInstance.close('a');
            $route.reload();
          }
        );
        /*estudiantes.email.forEach(function(email_item){
          $scope.data_emails.push({'email': email_item.text, 'course_id': StorageService.get('dataCurso').id});
        });*/
        /*ViewActiv.crearEstudiante({data: $scope.data_emails}, StorageService.get('dataCurso').id).then(
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
        );*/
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