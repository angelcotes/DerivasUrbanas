angular.module('vista')
  .controller('mapa', function ($scope, ViewActiv, $location, $route, StorageService, ngNotify){
    $scope.crearActivity = function(){
        $scope.activity.latitude = document.getElementById('Latitude').value;
        $scope.activity.longitude = document.getElementById('Longitude').value;
        $scope.activity.course_id = StorageService.get('dataCurso').id;
        ViewActiv.crearActividad($scope.activity).then(
        function success(response) {
          ngNotify.set('Actividad creada', 'success');
          $route.reload();
          $location.path("activity");
        }, function error(response){
          ngNotify.set(response.data, 'error');
          $location.path("activity");
          $route.reload();
        }
      );
    };
});