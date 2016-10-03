'use strict';
angular.module('vista')
  .controller('LoginCtrl', function ($scope, AuthService ) { 
    $scope.signIn = function () {      
      AuthService.login($scope.user);
    };
    $scope.changeUrl = function (){
    	$location.path('signIn');
    };
    $scope.LogOut = function () {
      AuthService.signOut();
      console.log($scope);
    };
  });