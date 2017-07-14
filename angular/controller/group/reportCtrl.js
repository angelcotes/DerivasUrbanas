angular.module('vista')
  .controller('reportCtrl', function ($timeout, $uibModalInstance, $scope, $uibModal, ViewActiv, $location, $route, StorageService, grupo) {
    var marker = new google.maps.Marker();
    var cityCircle = new google.maps.Circle;
    var grupo = grupo;
    $uibModalInstance.opened.then(function() {
      function initialize() {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
        var divMapa = document.getElementById('map-canvas');
        $(".cargando").hide();
        var data_time = new Date();
        function fn_error(){
          divMapa.innerHTML = 'Para poder ver la actividad debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.';
        }
        function fn_ok(respuesta){
          ViewActiv.miembros(grupo).then(
            function success(response) {
              $scope.data_miembros = response.data.data;
              $scope.documentos = response.data.documents;
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
          );              
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
    $scope.uploadFile = function(files, estudiante) {
      var file = files[0];
      //Take the first selected file
      if (estudiante.user_id == StorageService.get('currentUser').id) {
        $(".archivo").hide();
        $(".cargando").show();
        var fd = new FormData();
        fd.append("file", file);
        if (new Date(file.lastModified) >= new Date(estudiante.time_start) && new Date(file.lastModified) <= new Date(estudiante.time_finished)) {
            ViewActiv.guardarDocumento(fd, grupo).then(
              function success(response) {
                $route.reload();
                $(".cargando").hide();
                alert("Documento guardado");
                $uibModalInstance.close('a');
                $(".archivo").show();
              }, function error(response){
                $route.reload();
                $(".cargando").hide();
                $(".archivo").show();
              }
            );
        } else{
          alert('Documento creado fuera del tiempo permitido para esta actividad');
        };
        /*EXIF.getData(file, function() {
          console.log('Entre');
          //var MetaData = EXIF.getAllTags(file);
          if (MetaData.GPSLatitude != undefined && MetaData.GPSLongitude != undefined ) {
            var latitude = [];
            var longitude = [];
            latitude = MetaData.GPSLatitude;
            longitude = MetaData.GPSLongitude;
            var latRef = MetaData.GPSLatitudeRef || "N";  
            var lonRef = MetaData.GPSLongitudeRef || "W";
            latitude = (latitude[0] + latitude[1]/60 + latitude[2]/3600) * (latRef == "N" ? 1 : -1);  
            longitude = (longitude[0] + longitude[1]/60 + longitude[2]/3600) * (lonRef == "W" ? -1 : 1); 
            var pointA = new google.maps.LatLng(latitude, longitude);
            var pointB = new google.maps.LatLng(parseFloat(estudiante.latitude), parseFloat(estudiante.longitude));
            var distanceBetweenPoints = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
            if (distanceBetweenPoints <= parseFloat(estudiante.range)  && binary_reader.file.lastModifiedDate >= new Date(estudiante.time_start) && binary_reader.file.lastModifiedDate <= new Date(estudiante.time_finished)) {
              ViewActiv.guardarDocumento(fd, grupo).then(
                function success(response) {
                  $uibModalInstance.close('a');
                  $route.reload();
                  alert("Documento guardado");
                }, function error(response){
                  alert(response);
                  $route.reload();
                }
              );
            } else{
              alert('Documento creado fuera del tiempo permitido para esta actividad');
            };
          } else if (file.lastModifiedDate >= new Date(estudiante.time_start) && file.lastModifiedDate <= new Date(estudiante.time_finished)) {
              ViewActiv.guardarDocumento(fd, grupo).then(
                function success(response) {
                  $route.reload();
                  alert("Documento guardado");
                }, function error(response){
                  $route.reload();
                }
              );
              $uibModalInstance.close('a');
          } else{
            alert('Documento creado fuera del tiempo permitido para esta actividad');
          };
        }); */      
      }else{
        alert('No puede subir archivos desde este enlace');
      };
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
    };
    $scope.view = function(data){
      console.log(data);
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/viewDocument.html',
        controller: 'viewDocCtrl as ViewFile',
        resolve: {
          data: function(){
            return data
          }
        }
      })
    };
    $scope.eliminar = function(documento){
      ViewActiv.eliminarDocumento(documento.id).then(
        function success(response) {
          $route.reload();
          alert("Documento eliminado");
        }, function error(response){
          alert(response);
          $route.reload();
        }
      );
      $uibModalInstance.close('a');
    };
});