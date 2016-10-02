'use strict';

angular.module('vista')
.controller('singUpCtrl', function ($scope, AuthService) {

	$scope.sendata = function () {      
	  AuthService.signUp($scope.user);
	};
});