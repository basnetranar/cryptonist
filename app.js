'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.liveTable',
  'myApp.home'
])
.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
