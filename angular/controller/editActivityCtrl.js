angular.module('vista')
  .controller('editActivityCtrl', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, data) {
    $scope.actividad = data;
    $scope.actividad.latitude = parseFloat(data.latitude);
    $scope.actividad.longitude = parseFloat(data.longitude);
    $scope.actividad.start_date = new Date(data.start_date);
    $scope.actividad.finish_date = new Date(data.finish_date);
    $uibModalInstance.opened.then(function() {
      function initialize() {
        var latlng = new google.maps.LatLng(data.latitude, data.longitude);
        var myOptions = {
            zoom: 17,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
      }
      $timeout(function() {
         initialize()
       }, 1000);
    });
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
    $scope.editar = function(actividad){
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