angular.module('vista')
  .controller('mapa', function ($scope, ViewActiv, $location, $route, StorageService){
    $scope.crearActivity = function(){
        $scope.activity.latitude = document.getElementById('Latitude').value;
        $scope.activity.longitude = document.getElementById('Longitude').value;
        $scope.activity.course_id = StorageService.get('dataCurso').id;
        ViewActiv.crearActividad($scope.activity).then(
        function success(response) {
          alert('Actividad creada');
          $route.reload();
          $location.path("activity");
        }, function error(response){
          $location.path("activity");
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
    };
});