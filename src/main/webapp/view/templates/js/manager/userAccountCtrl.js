angular.module('demo').controller('userAccountCtrl', ['$scope', '$http', '$cookies', '$state', function($scope,$http,$cookies,$state) {
	
	checkCookie($cookies.get('email'), $state);
	
	var mailFlag = false;
	var userData = "";
	
	$scope.getList = function() {
		console.log("get list in");
		$http({
            method : 'GET',
            url : 'http://localhost:8080/RestfulAngular/rest/account/getUser'
        }).then(function successCallback(response) {
        	//$scope.userList = response.data;
        	var data = response.data;
        	angular.forEach(data, function(value, key){
        		if(value.role_id == 1){
        			value.role_id = "Admin";
        		}else{
        			value.role_id = "使用者";
        		}
    	    });
        	$scope.userList = data;
        	userData = data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    };
	
    $scope.getList();
    
    $("#comPwd").change(function() {
		console.log("comPwd function");
		if($("#pwdAdd").val() === $("#comPwd").val()){
			$("#errorPwd").hide();
    		$("#checkPwd").show();
		}else{
			$("#errorPwd").show();
    		$("#checkPwd").hide();
    		$("#comPwd").val("");
		}
	});
    
    $scope.checkMail = function() {
		console.log("checkMail in");
		if($("#mailAdd").val()!= null && $("#mailAdd").val() != "" && $("#comPwd").val()!= null && $("#comPwd").val() != ""){
			
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/account/checkMail',
	            data : $("#mailAdd").val(),
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
	            		$scope.getList();
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
    
    $scope.save = function() {
		console.log("add user in");
		
		if(mailFlag){
			var data = {"name": $("#nameAdd").val() , "pwd": $("#pwdAdd").val(), "mail":$("#mailAdd").val(), "role_id":$(".selectpickerAddUser").val()};
			
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/account/insert',
	            data : angular.toJson(data),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
	        }).then(function successCallback(response) {
	        	if(response.status === 200){
	        		notyFun('儲存成功', 'success', 'defaultTheme');
	        		$scope.getList();
	        		$(".close").trigger("click");
	        		mailFlag = false;
	        		//清空欄位
	        		$("#nameAdd").val("");
	        		$("#pwdAdd").val("");
	        		$("#comPwd").val("");
	        		$("#errorPwd").hide();
	        		$("#checkPwd").hide();
	        		$("#mailAdd").val("");
	        		$("#error").hide();
            		$("#check").hide();
            		$(".selectpickerAddUser").val("1");
	        	}
	        },function errorCallback(response) {
	        	notyFun('儲存失敗', 'error', 'defaultTheme');
	        });
	        
		}else{
			notyFun('請先按"Check mail"', 'warning', 'defaultTheme');
		}
    };
    
    $scope.edit = function(user) {
		console.log("edit user in");
		$scope.id = user.id;
		$scope.userName = user.name;
		$scope.pwd = user.pwd;
		$scope.mail = user.mail;
		$scope.role = user.role_id;
    };
    
    $scope.editSave = function() {
		console.log("edit user save in");
		var data = {id:$scope.id, name:$("#name").val(), pwd:$("#pwd").val()}
		
		$http({
            method : "POST",
            url : 'http://localhost:8080/RestfulAngular/rest/account/updateUser',
            data : angular.toJson(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function successCallback(response) {
        	//console.log(response);
        	if(response.status === 200){
        		notyFun('儲存成功', 'success', 'defaultTheme');
        		$scope.getList();
        	}
        },function errorCallback(response) {
        	//console.log(response);
        	notyFun('儲存失敗', 'error', 'defaultTheme');
        });
		
    };
    
    $scope.deleteEdit = function(user) {
		console.log("delete user in");
		$scope.id = user.id;
		$scope.name = user.name;
		$scope.pwd = user.pwd;
		$scope.mail = user.mail;
		$scope.role = user.role_id;
    };
    
    $scope.deleteClick = function() {
		console.log("delete click in");
		$http({
            method : 'DELETE',
            url : 'http://localhost:8080/RestfulAngular/rest/account/deleteUser/'+ $scope.id
        }).then(function successCallback(response) {
        	console.log(response);
        	if(response.status === 200){
        		notyFun('刪除成功', 'success', 'defaultTheme');
        		$scope.getList();
        	}
        }, function errorCallback(response) {
        	console.log(response);
        	notyFun('刪除失敗', 'error', 'defaultTheme');
        });
    };
}]);
