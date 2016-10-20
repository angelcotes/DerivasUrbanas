angular.module('vista')
  .controller('createActivity', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService) {
    $uibModalInstance.opened.then(function() {
      function initialize() {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
        var divMapa = document.getElementById('map-canvas');
        var data_time = new Date();
        function fn_error(){
            divMapa.innerHTML = 'Para poder ver la actividar debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.';
        }
        function fn_ok(respuesta){
            var marker = new google.maps.Marker;
            var cityCircle = new google.maps.Circle;
            var latitud = respuesta.coords.latitude;
            var longitud = respuesta.coords.longitude;
            /*var latArea = 11.0130076;
            var LonArea = -74.8276837;*/

            var pointA = new google.maps.LatLng(latitud, longitud);
            var pointB = new google.maps.LatLng(latitud, longitud);

            var distanceBetweenPoints = google.maps.geometry
                                        .spherical.computeDistanceBetween(pointA, pointB);
            if (distanceBetweenPoints >= 500) {
              $("#map-canvas").text('Fuera de rango: '+latArea);
            };
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
                    alert('Debe ingresar un valor para el radio del perimetro');
                } else{
                    marker.setMap(null);
                    cityCircle.setMap(null);
                    marker = new google.maps.Marker({
                        position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                        map: divMapa,
                        title: 'Hello World!'
                    });
                    cityCircle = new google.maps.Circle({
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: '#FF0000',
                      fillOpacity: 0.35,
                      map: divMapa,
                      center: {lat: event.latLng.lat(), lng: event.latLng.lng()},
                      radius: Number(radius)
                    });
                    document.getElementById('Latitude').value = event.latLng.lat();
                    document.getElementById('Longitude').value = event.latLng.lng();
                };                    
            });
        } 
      }
      $timeout(function() {
         initialize()
       }, 1000);
    });
    $scope.crearActivity = function(actividad){
        $scope.actividad.latitude = document.getElementById('Latitude').value;
        $scope.actividad.longitude = document.getElementById('Longitude').value;
        $scope.actividad.course_id = StorageService.get('dataCurso').id;
        ViewActiv.crearActividad($scope.actividad).then(
        function success(response) {
          alert('Actividad creada');
          $route.reload();
          $location.path("activity");
          $uibModalInstance.close('a');
        }, function error(response){
          $location.path("activity");
          $route.reload();
          alert('Usuario no autorizado');
          $uibModalInstance.close('a');
        }
      );
    };
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});