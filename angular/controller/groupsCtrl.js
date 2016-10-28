'use strict';

angular.module('vista')
  .controller('groupsCtrl', function ($window,$scope, $uibModal, AuthService, activityService, $location, StorageService) {
    $scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.ver = function(dataActivity){
      
    };
    $scope.crear = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/createGroup.html'
      })
    };
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
    };
    $scope.eliminarData = function(dataActivity){
      activityService.EliminarActividad(dataActivity, 'courses/' + dataActivity.course_id + '/activities/' + dataActivity.id).then(
        function success(response) {
          alert('Actividad eliminada');
          $location.path('activity');
          $route.reload();
        }, function error(response) {
          alert(response);
        }
      );  
    };
});