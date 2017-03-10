angular.module('demo').controller('permissionCtrl', ['$scope', '$http', function($scope,$http) {
	
	
	$scope.getList = function() {
		console.log("get list in");
		$http({
            method : 'GET',
            url : 'http://localhost:8080/RestfulAngular/rest/permission/getPermission'
        }).then(function successCallback(response) {
        	//$scope.pageList = response.data;
        	var data = response.data;
        	angular.forEach(data, function(value, key){
        		if(value.role_id == 1){
        			value.role_id = "Admin";
        		}else{
        			value.role_id = "使用者";
        		}
        		if(value.permission === 0){
        			value.stat = true;
        		}else{
        			value.stat = false;
        		}
        		value.isDisable = true;
    	    });
        	$scope.pageList = data;
        	
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    };
	
    $scope.getList();
    
    $scope.apply = function() {
		console.log("add page apply in");
		
		var data = {"page": $("#pageAdd").val(), "permission":$('input[name="permissionAdd"]:checked').val(), "role_id":$(".selectpickerAdd").val()};
		
		$http({
            method : "POST",
            url : 'http://localhost:8080/RestfulAngular/rest/permission/insertPermission',
            data : angular.toJson(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function successCallback(response) {
        	if(response.status === 200){
        		notyFun('儲存成功', 'success', 'defaultTheme');
        		$scope.getList();
        		$(".close").trigger("click");
        		//清空欄位
        		$("#pageAdd").val("");
        		$('input[name="permissionAdd"]:checked').val("1");
        		$(".selectpickerAdd").val("1");
        	}
        },function errorCallback(response) {
        	notyFun('儲存失敗', 'error', 'defaultTheme');
        });
    };
    
    $scope.edit = function(page) {
		console.log("edit page in");
		$scope.id = page.id;
		$scope.page = page.page;
		
		if(page.permission === 0){
			$scope.permissionUpd = "0";
		}else{
			$scope.permissionUpd = "1";
		}
		
		if(page.page === "dashboard"){
			$scope.isDisable = true;
		}else{
			$scope.isDisable = false;
		}
		
		$('select[name=selValue]').val(page.role_id === "Admin" ? "1":"2");
    };
    
    $scope.update = function() {
		console.log("edit save in");
		
		var data = {"id":$scope.id, "page":$("#pageUpd").val(),"permission":$('input[name="permissionUpd"]:checked').val(), "role_id":$(".selectpickerUpd").val()}
		
		$http({
            method : "POST",
            url : 'http://localhost:8080/RestfulAngular/rest/permission/updatePage',
            data : angular.toJson(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function successCallback(response) {
        	if(response.status === 200){
        		notyFun('儲存成功', 'success', 'defaultTheme');
        		$scope.getList();
        		$(".close").trigger("click");
        	}
        },function errorCallback(response) {
        	notyFun('儲存失敗', 'error', 'defaultTheme');
        });
    };
    
    $scope.deletePage = function(page) {
		console.log("delete page in");
		$scope.id = page.id;
		$scope.page = page.page;
		
		if(page.permission === 0){
			$scope.permissionDel = "0";
		}else{
			$scope.permissionDel = "1";
		}
		$scope.isDisabld = true;
		$scope.role = page.role_id;
    };
    
    $scope.deleteClick = function() {
		console.log("delete click in");
		$http({
            method : 'DELETE',
            url : 'http://localhost:8080/RestfulAngular/rest/permission/deletePage/'+ $scope.id
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

function notyFun(text, type, theme){
	noty({
		text: text,
		layout: 'bottom',
		type: type,
		theme: theme,
		animation: {
		    open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
		    close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
		    easing: 'swing',
		    speed: 1000 // opening & closing animation speed
		  },
		timeout: true,
	});
}