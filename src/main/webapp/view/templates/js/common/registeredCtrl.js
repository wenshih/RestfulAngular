angular.module('demo').controller('registeredCtrl', ['$scope', '$http', '$cookies', '$state', function($scope,$http,$cookies,$state) {
	
	var mailFlag = false;
	
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
	
	$scope.checkMail = function(){
		
		if($("#mail").val()!= null && $("#mail").val() != "" && $("#comPwd").val()!= null && $("#comPwd").val() != ""){
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/account/checkMail',
	            data : $("#mail").val(),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
	        }).then(function successCallback(response) {
	        	if(response.status === 200){
	        		
	        		if(response.data.mail != null){
	        			mailFlag = false;
	            		$("#error").show();
	            		$("#check").hide();
	            		notyFun('mail已註冊過', 'error', 'defaultTheme');
	            		$("#mailAdd").val("");
	            	}else{
	            		mailFlag = true;
	            		$("#error").hide();
	            		$("#check").show();
	            	}
	        	}
	        },function errorCallback(response) {
	        	notyFun('mail已註冊過', 'error', 'defaultTheme');
	        });
		}else{
			mailFlag = false;
			notyFun('請先填入mail', 'warning', 'defaultTheme');
		}
	};
	
	$scope.save = function(){
		
		if(mailFlag){
			var data = {"name": $("#name").val() , "pwd": $("#pwd").val(), "mail":$("#mail").val(), "role_id":"2"};
			
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/account/insert',
	            data : angular.toJson(data),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
	        }).then(function successCallback(response) {
	        	if(response.status === 200){
	        		notyFun('註冊成功', 'success', 'defaultTheme');
	        		mailFlag = false;
	        		//set cookie
	        		var d = new Date();
	        		d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	        	    var expires = "expires=" + d.toUTCString();
	        	    $cookies.put('email', data.mail, {'expires': expires});
	        		$state.go("app.dashboard",null, {reload: true}); 
	        		//清空欄位
	        		$("#name").val("");
	        		$("#pwd").val("");
	        		$("#comPwd").val("");
	        		$("#errorPwd").hide();
	        		$("#checkPwd").hide();
	        		$("#mail").val("");
	        		$("#error").hide();
            		$("#check").hide();
	        	}
	        },function errorCallback(response) {
	        	notyFun('註冊失敗', 'error', 'defaultTheme');
	        });
		}else{
			notyFun('請先按"Check mail"', 'warning', 'defaultTheme');
		}
	};
	
	$scope.clear = function() {
		$("#name").val("");
		$("#pwd").val("");
		$("#comPwd").val("");
		$("#errorPwd").hide();
		$("#checkPwd").hide();
		$("#mail").val("");
		$("#error").hide();
		$("#check").hide();
	};
	
}]);