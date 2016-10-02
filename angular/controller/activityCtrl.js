'use strict';

angular.module('vista')
  .controller('vistaCtrl', function ($scope, AuthService, ViewActiv) {
  	ViewActiv.mostrarCursos().then(
        function success(response) {
          $scope.cursos = response.data;
        }, function error(response) {
          alert(response);
        }
      );
  	console.log($scope.cursos);
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};
  	$scope.crearCurso = function(){
  		
  	}
});