angular.module('demo').controller('loginCtrl', ['$scope', '$http', '$cookies', '$state', function($scope,$http,$cookies,$state) {
	var setIntervalId;
	
	browserVerson();//os,browser version
	$scope.login = function() {
		if($("#pwd").val() != "" || $("#mail").val() != ""){
			var data = {"pwd": $("#pwd").val(), "mail":$("#mail").val()};
			
			$http({
		        method : "POST",
		        url : 'http://localhost:8080/RestfulAngular/rest/account/login',
		        data : angular.toJson(data),
		        headers : {
		            'Content-Type' : 'application/json'
		        }
		    }).then(function successCallback(response) {
		    	if(response.status === 200 && !_.isNull(response.data.mail)){
		    		notyFun('登入成功', 'success', 'defaultTheme');
		    		//set cookie
	        		var d = new Date();
	        		//d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	        		d.setTime(d.getTime() + (5 * 60 * 1000));//5min
	        	    var expires = "expires=" + d.toUTCString();
	        	    //document.cookie = "email=" + data.mail + "; " + expires + "; path=/";
		    		//$cookies.put('myFavorite', "oatmeal");
	        	    $cookies.put('email', data.mail, {'expires': expires});
		    		//var cookie = $cookies.get('email');
		    		//$state.go("app.dashboard", null);
	        	    $state.go("app.dashboard", null, {reload: true}); 
		    		//清空欄位
		    		$("#pwd").val("");
		    		$("#mail").val("");
		    		setIntervalId = checkCookieSecond($cookies.get('email'), $state);
		    	}else{
		    		notyFun('查無資料', 'warning', 'defaultTheme');
		    	}
		    },function errorCallback(response) {
		    	notyFun('登入失敗', 'error', 'defaultTheme');
		    });
		}else{
			notyFun('請輸入mail與密碼', 'warning', 'defaultTheme');
		}
		
		
	};
	
	$scope.clear = function() {
		$("#pwd").val("");
		$("#mail").val("");
	};
}]);