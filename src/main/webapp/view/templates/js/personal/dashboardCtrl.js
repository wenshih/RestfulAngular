angular.module('demo').controller('dashboardCtrl', ['$scope','$stateParams', '$cookies', '$state',function($scope,$stateParams,$cookies,$state) {
	//$scope.dashBoard = true;
	//console.log($stateParams);
	//checkCookie($cookies.get('email'), $state);
	//setTimeout("alert('對不起, 要你久候')", 2000 );
	//setInterval( function(){checkCookie($cookies.get('email'), $state);},(5 * 1000));
	//setInterval( function(){checkCookie($cookies.get('email'), $state);},(2000));
	checkCookie($cookies.get('email'), $state);
	clearCookie(setIntervalId, $cookies.get('email'));
}]);