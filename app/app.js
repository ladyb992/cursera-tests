'use strict';

angular.module('ngApp', [
  'ngRoute',
  'ngApp.view1',
  'ngApp.view2',
  'ngApp.facebook'
  
]).
config(['$routeProvider', function($routeProvider) {
 

  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
