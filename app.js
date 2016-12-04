//module
var weatherApp=angular.module('weatherApp',['ngRoute', 'ngResource']);
//routes
weatherApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'pages/home.html',
		controller:'homeControler'
	})
	.when('/forecast',{
		templateUrl:'pages/forecast.html',
		controller:'forecastControler'
	})
	.when('/forecast/:days',{
		templateUrl:'pages/forecast.html',
		controller:'forecastControler'
	})
});
//services
weatherApp.service('cityService',function() {
	this.city="Belgrade";
	})


//controllers
weatherApp.controller('homeControler',['$scope', 'cityService',function($scope, cityService){

	$scope.city=cityService.city;

	$scope.$watch('city', function(){
		cityService.city=$scope.city;

	})
}]);
weatherApp.controller('forecastControler',['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService){
	$scope.city=cityService.city;
	$scope.days=$routeParams.days || '2';

	$scope.weatherApi=$resource("https://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"}, {get:{method:"JSONP"}});
	$scope.weatherResult=$scope.weatherApi.get({q:$scope.city, cnt:$scope.days, APPID:'aec5946887b0b1060c15bd80d606c62d'});

	$scope.convertToCel=function(degK){

		return Math.round(degK- 273.15);
		}
	$scope.icon=function(ic){

		return "//openweathermap.org/img/w/"+ic+".png";

		}
	$scope.convertToDate=function(dt){

		return new Date(dt*1000);
}
}]);


//directives
// weatherApp.directive("weatherReport", function(){

// 	return {
// 		restrict: 'E',
// 		templateUrl: directives/weatherReport.html,
// 		replace:true,
// 		scope: {
// 			weatherDay: "=",
// 			convertToStandard: "&",
// 			convertToDate:"&",
// 			convertToIcon:"&",
// 			dateFormat:"@"

// 		}
// 	}
// })