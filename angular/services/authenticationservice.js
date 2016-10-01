'use strict';

angular.module('vista')
.factory('AuthService', function ($http, $rootScope, $location, BASE_URL, StorageService, ViewActiv) {
  var authService = {};

  authService.login = function (authAttempt) {
    var credentials = {
      email    : authAttempt.email,
      password : authAttempt.password
    };
    if (credentials !== undefined) {
      $http.post(BASE_URL + 'auth/sign_in', credentials)
        .then(
          function success(response) {
            var headers = {
              'uid'          : response.headers(['uid']),
              'client'       : response.headers(['client']),
              'access-token' : response.headers(['access-token'])
            };

            var currentUser = {
              id: response.data.data.id,
              email: response.data.data.email,
              firstName: response.data.data.first_name,
              lastName: response.data.data.last_name,
              type: response.data.data.users_type
            };
            StorageService.clear();
            StorageService.set('headers', headers);
            StorageService.set('currentUser', currentUser);
            $rootScope.dataShouldPersist = authAttempt.remember;
            if (response.data.data.users_type == 'Teacher') {
              ViewActiv.getCredencial();
              $location.path("activity");
            } else{
              $location.path("Students");
            };
          }, function error(response) {
            alert(response.data.errors);
        }
      );       
    };      
  };

  authService.signOut = function (credentials) {
    if (credentials !== undefined) {
      $http.delete(BASE_URL + 'auth/sign_out', credentials)
        .then(
          function success(response) {
            StorageService.clear();
            $location.path("home");
          }, function error(argument) {
            alert(argument.data.errors);
          }
      );
    };
    
  };

  authService.signUp = function (credentials) {
    if (credentials !== undefined) {
      $http.post(BASE_URL + 'auth', credentials)
      .then(
        function success(response) {
          StorageService.clear();
          $location.path('home');
        }, function error(argument) {
          alert(argument.data.errors);
        }
      );
    };
  };

  return authService;
});