angular.module('demo').controller('dashboardCtrl', ['$scope','$stateParams', '$cookies', '$state',function($scope,$stateParams,$cookies,$state) {
	//$scope.dashBoard = true;
	//console.log($stateParams);
	checkCookie($cookies.get('email'), $state);
}]);