'use strict';

angular.module('vista')
  .controller('studentCtrl', function ($window, MyWorker, $scope, $route, $uibModal, AuthService, activityService, $location, StorageService) {
    if (StorageService.get('dataCurso') != null) {
      activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/courses/' + StorageService.get('dataCurso').id + '/students').then(
        function success(response) {
          $scope.estudiantes = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    } else{
      activityService.mostrarActividades('users/' + StorageService.get('currentUser').id + '/students').then(
        function success(response) {
          $scope.estudiantes = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    };
    MyWorker.prototype.verificar();
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
        templateUrl: 'partial_views/student/editStudent.html'
      })
    }
    $scope.eliminarData = function(dataStudent){
      console.log(dataStudent);
      activityService.EliminarActividad('courses/' + dataStudent.course.id + '/students/' + dataStudent.id).then(
        function success(response) {
          $route.reload();
          alert('Estudiante eliminado');
        }, function error(response) {
          alert(response);
        }
      );  
    };
});