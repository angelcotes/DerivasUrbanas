'use strict';

angular.module('vista')
.factory('AuthService', function ($http, $rootScope, $location, BASE_URL, StorageService) {
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
              users_type: response.data.data.users_type
            };
            StorageService.clear();
            StorageService.set('activity_start', {state: false});
            StorageService.set('dateStart', false);
            StorageService.set('headers', headers);
            StorageService.set('currentUser', currentUser);
            $rootScope.dataShouldPersist = authAttempt.remember;
            $location.path("courses");
          }, function error(response) {
            alert(response.data.errors);
        }
      );       
    };      
  };

  authService.signOut = function () {
    var credentials = StorageService.get('headers');
    if (credentials !== undefined) {
      $http.delete(BASE_URL + 'auth/sign_out',{'headers': credentials})
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
  authService.addManyUsers = function (dataUsers, course_id){
    return $http({
      method: 'POST',
      url: BASE_URL + 'import',
      data: {
        upload: dataUsers,
        course_id: course_id
      }
    })
  };
  authService.signUp = function (dataUser) {
    $http({
      method: 'POST',
      url: BASE_URL + 'auth',
      data: dataUser
    })
    .then(
      function success(response) {
        StorageService.clear();
        $location.path('/home');
      }, function error(argument) {
        alert(argument.data.errors);
      }
    );
  };
  return authService;
});