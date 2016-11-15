angular.module('vista')
  .controller('reportCtrl', function ($timeout, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, grupo) {
    var marker = new google.maps.Marker();
    var cityCircle = new google.maps.Circle;
    ViewActiv.miembros(grupo).then(
      function success(response) {
        $scope.data_miembros = response.data;
        console.log(response.data);
      }, function error(response){
      }
    );
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
          var latitud = parseFloat($scope.data_miembros[0].latitude);
          var longitud = parseFloat($scope.data_miembros[0].longitude);
          var citymap = {
            area_work: {
              center: {lat: latitud, lng: longitud}
            }
          };
          divMapa = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: latitud, lng: longitud},
            zoom: 17
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
    $scope.ruta = function(estudiante){
      var flightPlanCoordinates = [];
      var divMapa = document.getElementById('map-canvas');
      divMapa = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: parseFloat(estudiante.latitude), lng: parseFloat(estudiante.longitude)},
        zoom: 17
      });
      var ruta_estudiante = firebase.database().ref("User_id_" + estudiante.user_id + "/Act_id_" + estudiante.activity_id);
      ruta_estudiante.on('child_added', function(data_route){
        flightPlanCoordinates.push({lat: data_route.val().Latitud, lng: data_route.val().Longitud})
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });
        flightPath.setMap(divMapa);
      });
      console.log(ruta_estudiante);
    };
});