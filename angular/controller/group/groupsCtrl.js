'use strict';

angular.module('vista')
  .controller('groupsCtrl', function ($window,$scope, $uibModal, AuthService, $route, activityService, $location, StorageService) {
    $scope.types = StorageService.get('currentUser').users_type;
    if ($scope.types == 'Teacher') {
      if (StorageService.get('dataCurso') != undefined && StorageService.get('dataActivity') != undefined) {
        activityService.mostrarGrupos().then(
          function success(response){
            if (response.data.length > 0) {
              $scope.types = response.data[0].users_type;
              $scope.course_nrc = StorageService.get('dataCurso').nrc;
              $scope.activity_id = StorageService.get('dataActivity').id;
              $scope.grupos = response.data;
            };
          }, function error(response){
            alert(response.data);
          }
        );
      } else{
        activityService.mostrarGruposTodos().then(
          function success(response){
            if (response.data.length > 0) {
              $scope.types = response.data[0].users_type;
              $scope.course_nrc = response.data[0].course_nrc;
              $scope.activity_id = response.data[0].activity_id;
              $scope.grupos = response.data;
            };
          }, function error(response){
            alert(response.data);
          }
        );
      };
    } else{
      if (StorageService.get('dataActivity') != undefined) {
        activityService.mostrarGrupoEstudiante(StorageService.get('dataActivity')).then(
          function success(response) {
            $scope.grupos = response.data;
            console.log(response);
          }, function error(response) {
            
          }
        );
      } else{
        activityService.mostrarGruposEstudiante().then(
          function success(response) {
            $scope.grupos = response.data;
            console.log(response);
          }, function error(response) {
            console.log(response);
          }
        );
      };
    };
    $scope.LogOut = function(){
  		AuthService.signOut();
  	};
    $scope.ver = function(id_grupo){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/reportGroup.html',
        controller: 'reportCtrl as reportGro',
        resolve: {
          grupo: function(){
            return id_grupo
          }
        }
      })
    };
    $scope.crear = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/createGroup.html',
        controller: 'createGroupCtrl as createGro'
      })
    };
    $scope.editarGrupo = function(grupo){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/editGroup.html',
        resolve: {
          grupo: function(){
            return grupo
          }
        }
      })
    };
    $scope.estudiantes = function(infoGrupo){
      infoGrupo.users_type = StorageService.get('currentUser').users_type;
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/groups/addMembers.html',
        controller: 'addMembersCtrl as addMCtrl',
        resolve: {
          grupo: function(){
            return  infoGrupo
          }
        }
      })
    }
    $scope.eliminarData = function(dataGroup){
      activityService.EliminarActividad('courses/' + dataGroup.course_nrc + '/activities/' + $scope.activity_id + '/groups/'+ dataGroup.id).then(
        function success(response) {
          $route.reload();
          alert('Grupo eliminado');
          $location.path('groups');
        }, function error(response) {
          $route.reload();
          alert(response);
        }
      );  
    };
});