angular.module('vista')
  .controller('createActivity', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, ngNotify) {
    $uibModalInstance.opened.then(function() {
      function initialize() {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
        var divMapa = document.getElementById('map-canvas');
        function fn_error(){
          divMapa.innerHTML = 'Para poder ver la actividad debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.';
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
          $('#startDate').datepicker();
          $('#finishDate').datepicker();
          google.maps.event.addListener(divMapa, 'click', function(event){
            var radius = document.getElementById('Radius').value;
            if (Number(radius) === 0) {
              ngNotify.set('debe ingresar un valor para el radio', 'error');
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
       }, 1000);
    });
    $scope.crearActivity = function(actividad){
      var ids = $scope.actividad.nrc.split(",");
      /*necesito el ID del curso*/
      ViewActiv.crearActividad($scope.actividad, ids[0]).then(
        function success(response) {
          $route.reload();
          ngNotify.set('Actividad creada', 'success');
          $location.path("activity");
          $uibModalInstance.close('a');
        }, function error(response){
          $route.reload();
          ngNotify.set('Usuario no autorizado', 'error');
          $location.path("activity");
          $uibModalInstance.close('a');
        }
      );
    };
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});