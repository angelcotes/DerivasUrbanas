'use strict';
/*http://ec2-52-21-228-235.compute-1.amazonaws.com:3000/*/
/*http://201.150.96.82:3002/*/
angular.module('vista', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'ngMap', 'ngTagsInput', 'ngNotify', 'ngFileUpload'])
.constant('BASE_URL', 'http://localhost:3000/')
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = "POST, GET, OPTIONS, DELETE";
    $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = "3600";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = "x-requested-with";
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/courses',{
        templateUrl: 'partial_views/activity.html',
        controller: 'vistaCtrl as activ'
    })
    .when('/view_activity',{
        templateUrl: 'partial_views/view_activity.html',
        controller: 'viewActivityCtrl as viewActivity'
    })
    .when('/students',{
        templateUrl: 'partial_views/students.html',
        controller: 'studentCtrl as Student'
    })
    .when('/signIn',{
        templateUrl: 'partial_views/signIn.html',
        controller: 'singUpCtrl as signUp'
    })
    .when('/contact',{
        templateUrl: 'partial_views/contact.html'
    })
    .when('/activity',{
        templateUrl: 'partial_views/courses.html',
        controller: 'activityCtrl as activC'
    })
    .when('/groups',{
        templateUrl: 'partial_views/groups.html',
        controller: 'groupsCtrl as groups'
    })
    .when('/home',{
        templateUrl: 'partial_views/home.html',
        controller: 'LoginCtrl as login'
    }).otherwise({ redirectTo: '/home' })
})
.run(function (StorageService, $rootScope, $location, MyWorker) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var user = StorageService.get('headers');
        if (StorageService.get('headers') === undefined) {
            if (next.templateUrl == 'partial_views/signIn.html') {
                $location.path("signIn");
            }
            else{
                $location.path("home");
            }
        }
    });
});