angular.module('vista')
  .controller('editActivityCtrl', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, data) {
    var marker = new google.maps.Marker();
    var cityCircle = new google.maps.Circle;
    $scope.actividad = data;
    $scope.actividad.latitude = parseFloat(data.latitude);
    $scope.actividad.longitude = parseFloat(data.longitude);
    $scope.actividad.start_date = new Date(data.start_date);
    $scope.actividad.finish_date = new Date(data.finish_date);
    $uibModalInstance.opened.then(function() {
      function initialize() {
        
        var latlng = new google.maps.LatLng($scope.actividad.latitude, $scope.actividad.longitude);
        var myOptions = {
          zoom: 17,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        marker = new google.maps.Marker({
          position: latlng,
          map: map,
          draggable:true
        });
        $scope.markerPos = function(){
          google.maps.event.addListener(marker, 'drag', function(event){
            cityCircle.setMap(null);
            $scope.actividad.latitude = event.latLng.lat();
            $scope.actividad.longitude = event.latLng.lng();
            cityCircle = new google.maps.Circle({
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              map: map,
              draggable:true,
              center: {lat: event.latLng.lat(),  lng: event.latLng.lng()},
              radius: Number($scope.actividad.range)
            });
          });
        };
        cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          draggable:true,
          center: latlng,
          radius: Number($scope.actividad.range)
        }); 
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