'use strict';

angular.module('vista')
  .controller('studentCtrl', function ($window, $scope, $uibModal, AuthService, activityService, $location, StorageService) {
    if (StorageService.get('dataCurso') != null) {
      activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/courses/' + StorageService.get('dataCurso').id + '/students').then(
        function success(response) {
          console.log(response);
          $scope.estudiantes = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    } else{
      activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/students').then(
        function success(response) {
          console.log(response.data);
          $scope.estudiantes = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    };
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.agregar = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/student/createStudent.html',
        controller: 'crear as create'
      })
    }
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
    }
    $scope.eliminarData = function(dataStudent){
      console.log(dataStudent);
      activityService.EliminarActividad(dataStudent, 'courses/' + dataStudent.course.id + '/students/' + dataStudent.id).then(
        function success(response) {
          alert('Estudiantes eliminado');
          $route.reload();
          $location.path('students');
        }, function error(response) {
          alert(response);
        }
      );  
    };
});