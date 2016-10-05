'use strict';

angular.module('vista')
  .controller('vistaCtrl', function ($scope, $uibModal, AuthService, ViewActiv, $location, StorageService) {
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
    $scope.ver = function(dataCurso){
      StorageService.set('dataCurso', dataCurso);
      $location.path('courses');
    };  	
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/createCourse.html',
        controller: 'createCourseCtrl as create'
      });
    };
    $scope.editarCurso = function (dataCurso) {
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/editCourse.html',
        controller: 'createCourseCtrl as create',
        resolve: {
          name: function(){
            return dataCurso.name;
          },
          period: function(){
            return dataCurso.period
          },
          user_id: function(){
            return dataCurso.user_id
          },
          id: function(){
            return dataCurso.id
          }
        }
      });
    };
    $scope.delete = function (curso){
      console.log(curso);
      ViewActiv.EliminarCurso(curso).then(
        function success(response){
          $route.reload();
          alert('Curso eliminado');
        }, function error(response){
          alert('El curso no se pudo eliminar');
        }
      );
    };
});