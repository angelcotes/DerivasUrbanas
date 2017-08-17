angular.module('vista')
  .controller('viewDocCtrl', function ($http, $timeout, data, $uibModalInstance, $scope, $uibModal, ViewActiv, $location, $route, StorageService) {
    var documentParts = data.type.split("/");
    $scope.format = documentParts[0];
    $scope.url = data.url;

    $scope.cancelar = function(){
      $route.reload();
      $uibModalInstance.close('a');
    };
});