'use strict';
angular.module('vista')
  .controller('LoginCtrl', function ($scope, AuthService) {

    // console.log(StorageService.get('headers'));
    $scope.signIn = function () {      
      AuthService.login($scope.user);
    };
    $scope.changeUrl = function (){
    	$location.path('signIn');
    };
    $scope.logUp = function () {
    	AuthService.signOut();
    	console.log($scope);
    };
  });