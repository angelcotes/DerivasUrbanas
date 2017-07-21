angular.module('vista')
  .controller('optionCreation', function ($uibModal, $uibModalInstance, $scope, ViewActiv, $location, $route, StorageService, AuthService) {
    $scope.one = function(dataSms){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/student/createOneStundent.html',
        controller: 'crearOne as creatOneStu'
      })
      $uibModalInstance.close('a');
    };
    $scope.someone = function(){
      var modalInstance = $uibModal.open({
        templateUrl: 'partial_views/student/createStudent.html',
        controller: 'crear as createStu'
      })
      $uibModalInstance.close('a');
    };
});