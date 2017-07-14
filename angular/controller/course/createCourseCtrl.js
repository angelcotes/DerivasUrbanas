'use strict';

angular.module('vista')
  .controller('createCourseCtrl', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, id, name, period, user_id, nrc) {
    $scope.course = {name: name, period: period, nrc: nrc};
    $scope.sms = function(dataSms){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/message/modalSms.html',
        controller: 'smsCtrl as smsC',
        resolve: {
          data: function(){
            return dataSms;
          }
        }
      });
      $route.reload();
    };
    $scope.crearCursoModal = function(){
  		ViewActiv.crearCurso($scope.course).then(
        function success(response) {
          $scope.sms("Curso Creado");
          $location.path("activity");
        }, function error(response){
          $scope.sms(response.data);
          $route.reload();
        }
      );
      $uibModalInstance.close('a');
  	};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
    $scope.edit = function(){
      var data = {
        name: $scope.course.name,
        period: $scope.course.period,
        nrc: $scope.course.nrc,
        id: id,
        user_id: user_id
      };
      ViewActiv.editarCurso(data).then(
        function success(response) {
          $scope.sms("Curso Editado");
          $route.reload();
        }, function error(response){
          $scope.sms(response.data);
          $route.reload();
        }
      );
      $uibModalInstance.close('a');
    };
});