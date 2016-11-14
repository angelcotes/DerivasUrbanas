angular.module('vista')
  .controller('reportCtrl', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    var marker = new google.maps.Marker();
    var cityCircle = new google.maps.Circle;
    $uibModalInstance.opened.then(function() {
      function initialize() {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
        var divMapa = document.getElementById('map-canvas');
        var data_time = new Date();
        function fn_error(){
          divMapa.innerHTML = 'Para poder ver la actividad debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.';
        }
        function fn_ok(respuesta){
          var marker = new google.maps.Marker;
          var cityCircle = new google.maps.Circle;
          var latitud = respuesta.coords.latitude;
          var longitud = respuesta.coords.longitude;
          var citymap = {
            area_work: {
              center: {lat: latitud, lng: longitud}
            }
          };
          divMapa = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: latitud, lng: longitud},
            zoom: 17
          });
          google.maps.event.addListener(divMapa, 'click', function(event){
            var radius = document.getElementById('Radius').value;
            if (Number(radius) === 0) {
              alert('Debe ingresar un valor para el radio');
            } else{
              marker.setMap(null);
              cityCircle.setMap(null);
              marker = new google.maps.Marker({
                position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                map: divMapa,
                title: 'Centro de actividad'
              });
              cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: divMapa,
                title: 'Area de actividad',
                center: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                radius: Number(radius)
              });
              $scope.actividad.latitude = event.latLng.lat();
              $scope.actividad.longitude = event.latLng.lng();
            };               
          });
        } 
      }
      $timeout(function() {
        initialize()
       }, 1000);;
    });
    $scope.cancelar = function(){
      $route.reload();
      $uibModalInstance.close('a');
    };
    $scope.editar = function(actividad){
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