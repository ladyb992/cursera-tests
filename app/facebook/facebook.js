'use strict';

angular.module('ngApp.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])
.config(function($facebookProvider) {
  $facebookProvider.setAppId('1498778890133993');
  $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
})

.run(function($rootScope){

	  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope','$facebook', function($scope, $facebook) {
$scope.isLoggedIn = false;

$scope.login = function(){
  $facebook.login().then(function(){
    $scope.isLoggedIn=true;
    refresh();

  });
}
$scope.logout = function(){
  $facebook.logout().then(function(){
    $scope.isLoggedIn=false;
    refresh();

  });
}
function refresh(){
$facebook.api("/me?fields=id,name,email,first_name,last_name,gender,link").then(function(response){
$scope.welcomeMsg = "Welcome " + response.name;
$scope.isLoggedIn = true;
$scope.userInfo = response;
$facebook.api("/me?fields=picture").then(function(response){
$scope.picture = response.picture.data.url;
$facebook.api("/me?fields=permissions").then(function(response){
    $scope.permissions=response.permissions.data;
    $facebook.api("/me?fields=posts").then(function(response){
      $scope.p=response.posts;
      $scope.posts=response.posts.data;
    });
});
});

},
function(err){
  $scope.welcomeMsg = "Please Log in";
});
}
$scope.postStatus = function(){
  var body = this.body;
  $facebook.api("/me/feed", "post", {message:body}).then(function(response){
    $scope.msg = 'Thanks for Posting';
    refresh();
  });
}
refresh();
}]);