'use strict';

angular.module('vista')
  .controller('smsCtrl', function ($uibModalInstance, $scope, ViewActiv, $location, $route, data) {
    $scope.sms = {data: data};
    $scope.cancelar = function(){
      $uibModalInstance.close('a');
    };
});