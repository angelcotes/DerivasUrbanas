'use strict';

angular.module('vista')
  .controller('activityCtrl', function ($scope, $uibModal, AuthService, activityService, $location, StorageService) {
  	activityService.mostrarCursos('courses/' + StorageService.get('dataCurso').id + '/activities').then(
        function success(response) {
          $scope.actividades = response.data;
        }, function error(response) {
          alert(response);
        }
      );
  	$scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.ver = function(dataCurso){
    }; 	
});