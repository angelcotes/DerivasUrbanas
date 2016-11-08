'use strict';

angular.module('vista')
  .controller('activityCtrl', function ($window, $scope, $route, $uibModal, AuthService, activityService, $location, StorageService) {
    $scope.types = StorageService.get('currentUser').users_type;
    StorageService.clean('dataActivity');
    if (StorageService.get('currentUser').users_type == "Teacher") { 
      if (StorageService.get('dataCurso') != null) {
        activityService.mostrarActividades('courses/' + StorageService.get('dataCurso').nrc + '/activities').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: -34.397, lng: 150.644},
                 zoom: 8
              });
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
              var map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: -34.397, lng: 150.644},
                 zoom: 8
              });
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }, function error(response) {
            alert(response.data);
          }
        );
      };
    }else{
      if (StorageService.get('dataCurso') != null) {
        activityService.mostrarActividades('users/' + StorageService.get('dataCurso').course_id + '/activitiesStudent').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: -34.397, lng: 150.644},
                 zoom: 8
              });
            }           
            google.maps.event.addDomListener(window, 'load', $scope.initialize);
          }
        );
      } else{
        activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/AllactivitiesStudent').then(
          function success(response) {
            $scope.actividades = response.data;
            $scope.initialize = function() {
              var map = new google.maps.Map(document.getElementById('map'), {
                 center: {lat: -34.397, lng: 150.644},
                 zoom: 8
              });
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
});