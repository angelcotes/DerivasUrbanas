angular.module('vista')
  .controller('viewRelationCtrl', function ($http, $timeout, data, $uibModalInstance, $scope, $uibModal, ViewActiv, $location, $route, StorageService) {
    
    $scope.formataudio = "";
    $scope.formatimage = "";
    $scope.urlimage = "";
    $scope.urlaudio = "";
    angular.forEach(data, function(value){
	    var data = value.type.split("/");
	    if (data[0] == "image") {
	    	$scope.formatimage = data[0];
	    	$scope.urlimage = value.url;
	    }else{
	    	$scope.formataudio = data[0];
	    	$scope.urlaudio = value.url;
	    };
	});   

    $scope.cancelar = function(){
      $route.reload();
      $uibModalInstance.close('a');
    };
});