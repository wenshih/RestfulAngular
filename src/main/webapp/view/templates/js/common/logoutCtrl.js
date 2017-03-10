angular.module('demo').controller('logoutCtrl', ['$scope', '$http', '$cookies', '$state', function($scope,$http,$cookies,$state) {
	
	$cookies.remove('email');
	/*
	$scope.dashBoard = false;
	$scope.userAccount = false;
	$scope.adminAccount = false;
	$scope.permission = false;
	$scope.profile = false;
	$scope.login = true;
	//$route.reload();
	*/
	$state.go("app.home",null, {reload: true});
}]);