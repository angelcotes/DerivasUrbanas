'use strict';

angular.module('vista')
  .controller('vistaCtrl', function ($scope, $uibModal, $route,AuthService, ViewActiv, $location, StorageService) {
  	StorageService.clean('dataCurso');
    StorageService.clean('dataActivity');
    $scope.types = StorageService.get('currentUser').users_type;
    if(StorageService.get('currentUser').users_type == "Teacher"){
      ViewActiv.mostrarCursos().then(
        function success(response) {
          $scope.cursos = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    }
    else{
      ViewActiv.mostrarEstudianteCursos().then(
        function success(response) {
          console.log(response);
          $scope.cursos = response.data;
        }, function error(response) {
          alert(response);
        }
      );
    }
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.ver = function(dataCurso){
      StorageService.set('dataCurso', dataCurso);
      $location.path('courses');
    };
    $scope.estudiantes = function(dataCurso){
      StorageService.set('dataCurso', dataCurso);
      $location.path('students');
    };  	
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/course/createCourse.html',
        controller: 'createCourseCtrl as create',
        resolve: {
          name: function(){
            return null;
          },
          period: function(){
            return null;
          },
          user_id: function(){
            return null;
          },
          id: function(){
            return null;
          },
          nrc: function(){
            return null;
          }
        }
      })
    };
    $scope.editarCurso = function (dataCurso) {
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/course/editCourse.html',
        controller: 'createCourseCtrl as create',
        resolve: {
          name: function(){
            return dataCurso.name;
          },
          period: function(){
            return dataCurso.period;
          },
          user_id: function(){
            return dataCurso.user_id;
          },
          id: function(){
            return dataCurso.id;
          },
          nrc: function(){
            return dataCurso.nrc;
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