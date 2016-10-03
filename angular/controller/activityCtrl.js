'use strict';

angular.module('vista')
  .controller('vistaCtrl', function ($scope, $uibModal, AuthService, ViewActiv, $location) {
  	ViewActiv.mostrarCursos().then(
        function success(response) {
          $scope.cursos = response.data;
        }, function error(response) {
          alert(response);
        }
      );
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};  	
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/createCourse.html',
        controller: 'createCourseCtrl as create'
      });
    };
    $scope.delete = function (curso){
      console.log(curso);
      ViewActiv.EliminarCurso(curso).then(
        function success(response){
          alert('Curso eliminado');
        }, function error(response){
          alert('El curso no se pudo eliminar');
        }
      );
    };
});