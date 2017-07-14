angular.module('vista')
  .controller('viewDocCtrl', function ($http, $timeout, data, $uibModalInstance, $scope, $uibModal, ViewActiv, $location, $route, StorageService) {
    var documentParts = data.url.split(".");
    $scope.format = documentParts[documentParts.length - 1];
    $scope.url = data.url;

    $scope.cancelar = function(){
      $route.reload();
      $uibModalInstance.close('a');
    };
});