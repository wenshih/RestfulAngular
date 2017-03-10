angular.module('demo').controller('headerCtrl', ['$scope', '$http', '$cookies', '$stateParams', function($scope,$http,$cookies,$stateParams) {
	
	//console.log($stateParams);
	if(!_.isUndefined($cookies.get('email'))){
		
		var data = {"mail":$cookies.get('email')};
		$http({
	        method : "POST",
	        url : 'http://localhost:8080/RestfulAngular/rest/account/getByMail',
	        data : angular.toJson(data),
	        headers : {
	            'Content-Type' : 'application/json'
	        }
	    }).then(function successCallback(response) {
	    	if(response.status === 200){
	    		showAndHide($scope, response.data.role_id);
	    	}
	    },function errorCallback(response) {
	    	notyFun('Error', 'error', 'defaultTheme');
	    });
		
	}else{
		$scope.registered = true;
		$scope.dashBoard = false;
		$scope.userAccount = false;
		$scope.adminAccount = false;
		$scope.permission = false;
		$scope.profile = false;
		$scope.stock = false;
		$scope.login = true;
		$scope.logout = false;
	}
	
}]);

function showAndHide($scope, role){
	$scope.registered = false;
	$scope.login = false;
	$scope.dashBoard = true;
	$scope.profile = true;
	$scope.logout = true;
	$scope.stock = true;
	if(role === 1){
		$scope.userAccount = true;
		$scope.adminAccount = true;
		$scope.permission = true;
	}
		
}