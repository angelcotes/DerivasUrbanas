'use strict';

angular.module('vista')
  .controller('addMembersCtrl', function ($window,$scope, $uibModalInstance, AuthService, $route, activityService, $location, StorageService, grupo, ngNotify) {
    $scope.grupo = grupo;
    $scope.types = grupo.users_type;
    if (grupo.users_type == "Teacher") {
      activityService.mostrar('users/'+StorageService.get('currentUser').id+'/course/'+$scope.grupo.course_nrc+'/group/'+grupo.id+'/members').then(
        function success(response){
          $scope.estudiantes = response.data.student_course;
          $scope.miembros = response.data.members_group;
        }, function error(response){
          ngNotify.set(response.data.error, 'error');
          alert(response.data);
        }
      );
    };
    $scope.agregar = function(index, estudiante){
      $scope.estudiantes.splice(index, 1);
      $scope.miembros.push(estudiante);      
    };
    $scope.remover = function(index, miembro){
      $scope.miembros.splice(index, 1);
      $scope.estudiantes.push(miembro);
    };
    $scope.guardar = function(){
      activityService.crear('users/'+StorageService.get('currentUser').id+'/members', $scope.miembros).then(
        function success(response){
          $uibModalInstance.close('a');
          ngNotify.set('Grupo modificado', 'success');
          $route.reload();
        }, function error(response){
          $uibModalInstance.close('a');
          ngNotify.set(response.data.error, 'error');
          $route.reload();
        }
      );
    };
    $scope.cerrar = function(){
      $uibModalInstance.close('a');
    }
});