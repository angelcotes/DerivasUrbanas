angular.module('vista')
  .controller('reportCtrl', function (Upload, $timeout, $uibModalInstance, $scope, $uibModal, ViewActiv, $location, $route, StorageService, grupo, ngNotify) {
    var marker = new google.maps.Marker();
    var cityCircle = new google.maps.Circle;
    var grupo = grupo;
    var divMapa = document.getElementById('map-canvas');
    $uibModalInstance.opened.then(function() {
      function initialize() {
        navigator.geolocation.getCurrentPosition( fn_ok, fn_error);
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
            }, function error(response){
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
              ngNotify.set(response.data.sms, 'error');
            }
          );              
        }
        $scope.markerPos = function(){
          google.maps.event.addListener(marker, 'click', function(event){
            ViewActiv.verRelaciones(marker.relation).then(
              function success(response){
                var modalInstance = $uibModal.open({
                  templateUrl: 'partial_views/groups/viewDocumentRelation.html',
                  controller: 'viewRelationCtrl as ViewFile',
                  resolve: {
                    data: function(){
                      return response.data
                    }
                  }
                })
              }, function error(response){
                ngNotify.set(response.data.error, 'error');
              }
            );
          });
        }; 
      }
      $timeout(function() {
        initialize()
       }, 1000);
    });
    $scope.cancelar = function(){
      $route.reload();
      $uibModalInstance.close('a');
    };
    $scope.editar = function(actividad){
      ViewActiv.editarActividad(actividad).then(
        function success(response) {
          $route.reload();
          ngNotify.set('Actividad editada', 'success');
          $route.reload();
        }, function error(response){
          $route.reload();
          ngNotify.set(response.data.error, 'error');
        }
      );
      $uibModalInstance.close('a');
    };
    $scope.uploadFile = function(files, estudiante) {
      //Take the first selected file
      if (estudiante.user_id == StorageService.get('currentUser').id) {
        if(files.length <= 2){
          $(".archivo").hide();
          $(".cargando").show();
          var indexFiles = 0;
          var fd = new FormData();
          angular.forEach(files, function(file) {
            EXIF.getData(file, function() {
              var MetaData = EXIF.getAllTags(file);
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
                if (distanceBetweenPoints <= parseFloat(estudiante.range)  && file.lastModifiedDate >= new Date(estudiante.time_start) && file.lastModifiedDate <= new Date(estudiante.time_finished)) {
                  indexFiles++;
                  var dataFile = "@" + latitude  + "@" + longitude + "@" + file.type + "@" + file.name + "@";
                  fd.append("file[]", file, dataFile);
                } else{
                  $(".cargando").hide();
                  $(".archivo").show();
                  ngNotify.set('Documento creado fuera del tiempo permitido para esta actividad', 'info');
                };
              } else if (file.lastModifiedDate >= new Date(estudiante.time_start) && file.lastModifiedDate <= new Date(estudiante.time_finished)) {
                  indexFiles++;
                  var dataFile = "@nil@nil@" + file.type + "@" + file.name + "@";
                  fd.append("file[]", file, dataFile);
              } else{
                $(".cargando").hide();
                $(".archivo").show();
                ngNotify.set('Documento creado fuera del tiempo permitido para esta actividad', 'info');
              };
              if (indexFiles == files.length) {
                ViewActiv.guardarDocumento(fd, grupo).then(
                  function success(response) {
                    $uibModalInstance.close('a');
                    $route.reload();
                    ngNotify.set('Documento(s) guardado(s)', 'success');
                  }, function error(response){
                    ngNotify.set(response, 'error');
                    $route.reload();
                  }
                );
              }; 
            });
          });
        }else{
          $(".cargando").hide();
          $(".archivo").show();
          ngNotify.set('Solo se pueden enlazar dos archivos', 'info');
        }      
      }else{
        $(".cargando").hide();
        $(".archivo").show();
        ngNotify.set('No se puede subir archivos desde este enlace', 'info');
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
          ngNotify.set('Documento eliminado', 'success');
        }, function error(response){
          ngNotify.set(response.data.error, 'error');
          $route.reload();
        }
      );
      $uibModalInstance.close('a');
    };
    $scope.marcadores = function(estudiante){
      ViewActiv.verMarcadores(estudiante).then(
        function success(response){
          angular.forEach(response.data, function(value){
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(value.latitude, value.longitude),
              map: divMapa,
              relation: value.relation
            });
          });
        }, function error(response){
          ngNotify.set(response.data.error, 'error');
          $route.reload();
        }
      );
    }
});