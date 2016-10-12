angular.module('vista')
  .controller('createActivityCtrl', function ($uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, $timeout) {
    /*$uibModalInstance.opened.then(function(){
        var center = new google.maps.LatLng(-33.870501, 151.206704);
        var mapOptions = {
            zoom: 12,
            center: center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    });*/
    $scope.crearCursoModal = function(){
  		ViewActiv.crearCurso($scope.course).then(
        function success(response) {
          alert('Curso creado');
          $route.reload();
          $location.path("activity");
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
  	};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
    $scope.edit = function(){
      console.log($scope);
      var data = {
        name: $scope.course.name,
        period: $scope.course.period,
        id: id,
        user_id: user_id
      };
      ViewActiv.editarCurso(data).then(
        function success(response) {
          $route.reload();
          alert('Curso Editado');
          $route.reload();
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
    };
});