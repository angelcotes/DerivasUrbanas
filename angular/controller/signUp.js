'use strict';

angular.module('vista')
.controller('singUpCtrl', function ($scope, AuthService) {
	$scope.sendata = function (user) {
		$scope.user.users_type = 'Teacher';
		console.log(user);
		console.log($scope);      
	  AuthService.signUp($scope.user);
	};
});