var app = angular
   .module('app', [
      'ui.router'
   ])
   .config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
      $urlRouterProvider.otherwise('/');
   }])
   .controller('appCtrl',function($scope,$http){
      $scope.link = 'https://www.youtube.com/watch?v=6L6XqWoS8tw';
      $scope.sendLink = function(){
      $http.get("sendLink",{params: {link:$scope.link } })
         .then(function(response){
            console.log(response.data);
            $scope.link=response.data;
            $scope.status=response.data;
         });
      };
   });
   
