'use strict';

angular.module('vista')
  .controller('editGroupCtrl', function ($window,$scope, $uibModal, AuthService, $route, activityService, $location, StorageService, grupo) {
    $scope.grupo = grupo;
    $scope.types = grupo.users_type;
    if (grupo.users_type == "Teacher") {
      activityService.mostrar('course/' + grupo.course_nrc + '/students/').then(
      	function success(response){
          $scope.types = response.data[0].users_type;
          $scope.course_nrc = response.data[0].course_nrc;
          $scope.activity_id = response.data[0].activity_id;
          $scope.grupos = response.data;
        }, function error(response){
          alert(response.data);
        }
      );
    } else{
      
    };
});