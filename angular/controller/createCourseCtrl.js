'use strict';

angular.module('vista')
  .controller('createCourseCtrl', function ($scope, ViewActiv, $location, $route) {
  	$scope.crearCursoModal = function(){
      console.log($scope);
  		ViewActiv.crearCurso($scope.course).then(
        function success(response) {
          $route.reload();
          $location.path("activity");
        }, function error(response){
          $route.reload();
          alert('Usuario no autorizado');
        }
      );
  	};
    $scope.cancelar = function(){
      $location.path('activity');
    };
});