angular.module('demo').controller('profileCtrl', ['$scope', '$http', '$cookies', '$route', function($scope,$http,$cookies,$route) {
	
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
    		$scope.id = response.data.id;
    		$scope.name = response.data.name;
    		$scope.pwd = response.data.pwd;
    		$scope.comPwd = response.data.pwd;
    		$scope.mail = response.data.mail;
    	}
    },function errorCallback(response) {
    	notyFun('Error', 'error', 'defaultTheme');
    });
	
	$scope.update = function() {
		console.log("edit in");
		
		if(($("#pwd").val() != "" && !_.isNull($("#pwd").val())) && $("#comPwd").val() != "" && !_.isNull($("#comPwd").val())){
			
			var data = {"id":$scope.id, "name":$scope.name, "pwd":$("#pwd").val()}
			
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/account/updateUser',
	            data : angular.toJson(data),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
	        }).then(function successCallback(response) {
	        	if(response.status === 200){
	        		notyFun('儲存成功', 'success', 'defaultTheme');
	        		$route.reload();
	        	}
	        },function errorCallback(response) {
	        	notyFun('儲存失敗', 'error', 'defaultTheme');
	        });
		}else{
			notyFun('請輸入密碼', 'warning', 'defaultTheme');
		}
		
    };
    
    $("#comPwd").change(function() {
		console.log("comPwd function");
		if($("#pwd").val() === $("#comPwd").val()){
			$("#errorPwd").hide();
    		$("#checkPwd").show();
		}else{
			$("#errorPwd").show();
    		$("#checkPwd").hide();
    		$("#comPwd").val("");
		}
	});
    
    $scope.clear = function() {
		$("#pwd").val("");
		$("#comPwd").val("");
		$("#checkPwd").hide();
		$("#errorPwd").hide();
	};
}]);