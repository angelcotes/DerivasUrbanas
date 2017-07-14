'use strict';

angular.module('vista')
.controller('singUpCtrl', function ($scope, AuthService) {
	$scope.sendata = function (user) {    
	  AuthService.signUp($scope.user);
	};
});