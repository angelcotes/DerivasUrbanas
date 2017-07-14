angular.module('vista')
  .controller('crear', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, AuthService) {
    $scope.sms = function(dataSms){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/message/modalSms.html',
        controller: 'smsCtrl as smsC',
        resolve: {
          data: function(){
            return dataSms;
          }
        }
      });
      $route.reload();
    };
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
        $scope.sms('Los estudiantes han sido agregados, por favor espere mientras se envian las contraseñas a los estudiantes.');
        $uibModalInstance.close('a');
        AuthService.addManyUsers($scope.dataEmails, StorageService.get('dataCurso').id).then(
          function success(response) {
            if (response.data.successful_data.length > 0) {
                $route.reload();
                $scope.sms('Proceso de inscripcion de estudiantes terminado.');
            };
            if(response.data.error_data.length > 0){
              var error = "";
              response.data.error_data.forEach(function(emails){
                error = error + " " + emails
              });
              $scope.sms('Correos con problemas:' + error);
            };
            $uibModalInstance.close('a');
            $route.reload();
          }
        );
      } else{
        $route.reload();
        $scope.sms('Los estudiantes que se desean inscribir no tienen un curso asociado.');
        $uibModalInstance.close('a');
      };
    };
    $scope.editar = function(estudiantes){
      ViewActiv.editarActividad(actividad).then(
        function success(response) {
          $route.reload();
          $scope.sms('Actividad editada');
        }, function error(response){
          $route.reload();
          $scope.sms('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
    };
});