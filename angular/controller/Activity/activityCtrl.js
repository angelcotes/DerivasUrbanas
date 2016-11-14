'use strict';

angular.module('vista')
  .controller('activityCtrl', function ($interval, $window, $scope, $route, $uibModal, AuthService, activityService, $location, StorageService) {
    $scope.types = StorageService.get('currentUser').users_type;
    $scope.times = 30000;
    var firebaseRef = firebase.database().ref();
    StorageService.clean('dataActivity');
    var mapOptions = {
      center: {lat: -34.397, lng: 150.644},
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      zoom: 8
    };
    if (StorageService.get('currentUser').users_type == "Teacher") { 
      if (StorageService.get('dataCurso') != null) {
        activityService.mostrarActividades('courses/' + StorageService.get('dataCurso').nrc + '/activities').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), mapOptions);
              map.setOptions({streetViewControl: false});
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }, function error(response) {
            alert(response.data);
          }
        );
      } else{
        activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/activities').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }, function error(response) {
            alert(response.data);
          }
        );
      };
    }else{
      if (StorageService.get('dataCurso') != null) {
        activityService.mostrarActividades('users/' + StorageService.get('dataCurso').id + '/activitiesStudent').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }
        );
      } else{
        activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/AllactivitiesStudent').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }, function error(response) {
            alert(response);
          }
        );
      };
    }; 
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.ver = function(dataActivity){
      if (StorageService.get('currentUser').users_type == "Teacher"){
        StorageService.set('dataActivity', dataActivity);
        $location.path('');
      }      
    };
    $scope.crear = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/activity/createActivity.html',
        controller: 'createActivity as actCtrl'
      })
    };
    $scope.editar = function(actividad){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/activity/editActivity.html',
        controller: 'editActivityCtrl as actCtrl',
        resolve: {
          data: function(){
            return actividad
          }
        }
      })
    };
    $scope.eliminarData = function(dataActivity){
      activityService.EliminarActividad('courses/' + dataActivity.course_nrc + '/activities/' + dataActivity.id).then(
        function success(response) {
          alert('Actividad eliminada');
          $location.path('courses');
          $route.reload();
        }, function error(response) {
          alert(response);
        }
      );  
    };
    $scope.verGrupos = function(actividad){
      StorageService.set('dataActivity', actividad);
      $location.path('groups');
    };
    $scope.ejecutar = function(actividad){
      var date1 = new Date(Date.now());
      if (date1 <= new Date(actividad.finish_date)) {
        navigator.geolocation.getCurrentPosition(function(respuesta) {

          var pointA = new google.maps.LatLng(respuesta.coords.latitude, respuesta.coords.longitude);
          var pointB = new google.maps.LatLng(parseFloat(actividad.latitude), parseFloat(actividad.longitude));
          var distanceBetweenPoints = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
          if (distanceBetweenPoints >= parseFloat(actividad.range)) {
            $interval.cancel(interval, "pausado");
            activityService.iniciarActividad(actividad, "ejecutado").then(
              function succes(response){
                $interval.cancel(interval);
                console.log(response.sms);
              },function error(response){
                console.log(response.sms);
              }
            );
          } else{
            firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + actividad.id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude});
            activityService.iniciarActividad(actividad, "ejecutado").then(
              function succes(response){
                console.log(response.sms);
              },function error(response){
                console.log(response.sms);
              }
            );
          };
        }, function(error) {
          $interval.cancel(interval);
          console.log('Para poder ver la actividad debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.');
        });
      } else {
        $interval.cancel(interval);
        console.log('Esta actividad a finalizado');
      };
    };
    $scope.startActiviry = function(actividad){
      $scope.ejecutar(actividad);
      var interval = $interval(function () {
        var date1 = new Date(Date.now());
        if (date1 <= new Date(actividad.finish_date)) {
          navigator.geolocation.getCurrentPosition(function(respuesta) {

            var pointA = new google.maps.LatLng(respuesta.coords.latitude, respuesta.coords.longitude);
            var pointB = new google.maps.LatLng(parseFloat(actividad.latitude), parseFloat(actividad.longitude));
            var distanceBetweenPoints = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
            if (distanceBetweenPoints >= parseFloat(actividad.range)) {
              $interval.cancel(interval, "pausado");
              activityService.iniciarActividad(actividad, "ejecutado").then(
                function succes(response){
                  $interval.cancel(interval);
                  console.log(response.sms);
                },function error(response){
                  console.log(response.sms);
                }
              );
            } else{
              firebaseRef.child("User_id_" + StorageService.get('currentUser').id).child("Act_id_" + actividad.id).push().set({Latitud: respuesta.coords.latitude, Longitud: respuesta.coords.longitude});
              activityService.iniciarActividad(actividad, "ejecutado").then(
                function succes(response){
                  console.log(response.sms);
                },function error(response){
                  console.log(response.sms);
                }
              );
            };
          }, function(error) {
            $interval.cancel(interval);
            console.log('Para poder ver la actividad debe habilitar la geolocalizacion. Ingrese nuevamente a la pagina.');
          });
        } else {
          $interval.cancel(interval);
          console.log('Esta actividad a finalizado');
        };
      }, $scope.times);
    };
});