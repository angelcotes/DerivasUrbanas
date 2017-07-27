angular.module('vista')
  .controller('crear', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, AuthService, ngNotify) {
    $scope.datafile = "";
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
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.dataEmails = e.target.result;
      }
      reader.readAsText(files[0]);
    }
    $scope.crearEstudiante = function(){
      if (StorageService.get('dataCurso') != null) {
        $scope.dataEmails = $scope.dataEmails.replace("\"", "");
        ngNotify.set('Los estudiantes han sido agregados, por favor espere mientras se envian las contraseña a los estudiantes', 'success');
        $uibModalInstance.close('a');
        AuthService.addManyUsers($scope.dataEmails, StorageService.get('dataCurso').id).then(
          function success(response) {
            if (response.data.successful_data.length > 0) {
                $route.reload();
                ngNotify.set('Proceso terminado', 'success');
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
        ngNotify.set('Los estudiantes no tienen curso asociado', 'info');
        $uibModalInstance.close('a');
      };
    };
    $scope.editar = function(estudiantes){
      ViewActiv.editarActividad(actividad).then(
        function success(response) {
          $route.reload();
          ngNotify.set('Actividad editada', 'success');
        }, function error(response){
          $route.reload();
          ngNotify.set(response.data.error, 'error');
        }
      );
      $uibModalInstance.close('a');
    };
});