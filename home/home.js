'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope','$http','$interval','$timeout',function($scope,$http,$interval,$timeout) {

	$scope.cryptoTypes = ['BTC-BitCoin','BCH-Bitcoin Cash','LTC-LiteCoin','ETH-Ethereum','ZEC-ZCash','DASH-Dash'
						 ,'XRP-Ripple','XMR-Monero'];
	$scope.currencyTypes = ['USD','AUD','EUR'];
	$scope.Crypto = 'BTC';
	$scope.Currency = 'USD';
	$scope.marketArray = [];
	$scope.currentTime = 0;
	$scope.base = "";
	$scope.price = 0;
	$scope.volume = 0;
	$scope.change = 0;

	$scope.selectedCurrencyChanged = function(){
    $scope.Currency = $scope.selectedCurrency;
    getTicker();
  }

  $scope.selectedCryptoChanged = function(){
    $scope.Crypto =  ($scope.selectedCrypto.split('-'))[0];
    getTicker();
  }

	var getTicker = function(){

		$http.get(' https://api.cryptonator.com/api/full/' + $scope.Crypto + "-" + $scope.Currency)
		.then(function successCallback(response){
		$scope.result = response.data;
		$scope.marketArray = $scope.result.ticker.markets;
		$scope.base = $scope.result.ticker.base;
		$scope.price = $scope.result.ticker.price;
		$scope.volume = $scope.result.ticker.volume;
		$scope.change = $scope.result.ticker.change;
		$scope.currentTime = Date();
		}),
		function errorCallback(response) {
			console.log("page is invalid")};
		
	}
	getTicker();
	$interval(getTicker,30000);
	
}]);