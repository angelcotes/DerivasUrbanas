'use strict';

angular.module('vista')
  .controller('createCourseCtrl', function ($uibModalInstance, $scope, ViewActiv, $location, $route, name, period, user_id, id) {
    $scope.course = {name: name, period: period};
    $scope.crearCursoModal = function(){
      console.log($scope);
  		ViewActiv.crearCurso($scope.course).then(
        function success(response) {
          alert('Curso creado');
          $route.reload();
          $location.path("activity");
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
  	};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
    $scope.edit = function(){
      console.log($scope);
      var data = {
        name: $scope.course.name,
        period: $scope.course.period,
        id: id,
        user_id: user_id
      };
      ViewActiv.editarCurso(data).then(
        function success(response) {
          $route.reload();
          alert('Curso Editado');
          $route.reload();
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
      $uibModalInstance.close('a');
    };
});