angular.module('demo').controller('dashboardCtrl', ['$scope','$stateParams', '$cookies', '$state', '$http',function($scope,$stateParams,$cookies,$state,$http) {
	//$scope.dashBoard = true;
	//console.log($stateParams);
	//checkCookie($cookies.get('email'), $state);
	//setTimeout("alert('對不起, 要你久候')", 2000 );
	//setInterval( function(){checkCookie($cookies.get('email'), $state);},(5 * 1000));
	//setInterval( function(){checkCookie($cookies.get('email'), $state);},(2000));
	checkCookie($cookies.get('email'), $state);
	clearCookie(setIntervalId, $cookies.get('email'));
	
	var account_id = "";
	if(!_.isUndefined($cookies.get('email')) && $scope.stockId !== ""){
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
        		account_id = response.data.id;
        		$scope.getStockList(account_id);
        	}
        },function errorCallback(response) {
        	notyFun('Error', 'error', 'defaultTheme');
        });
	}else{
		if(_.isUndefined($cookies.get('email'))){
			$state.go("app.login", null, {reload: true});
			clearCookie(setIntervalId, $cookies.get('email'));
		}else{
			notyFun('請填股票代號', 'warning', 'defaultTheme');
		}
	}
	
	$scope.getStockList = function(account_id) {
		var data = {"account_id":account_id};
		$http({
    		method : "POST",
    		url : 'http://localhost:8080/RestfulAngular/rest/stock/getStockList',
    		data : angular.toJson(data),
    		headers : {
    			'Content-Type' : 'application/json'
    		}
    	}).then(function successCallback(response) {
    		var data = response.data;
        	$scope.stockList = data;
        },function errorCallback(response) {
        	notyFun('Error', 'error', 'defaultTheme');
        });
    };
    
    $scope.edit = function(stock) {
		console.log("edit stock in");
		$scope.id = stock.id;
		$scope.stockId = stock.stockId;
		$scope.stockName = stock.stockName;
		$scope.account_id = stock.account_id;
		$scope.cost = stock.cost;
		$scope.profit = stock.profit;
    };
    
    $scope.editSave = function() {
		console.log("edit stock save in");
		var data = {id:$scope.id, cost:$("#cost").val()}
		
		$http({
            method : "POST",
            url : 'http://localhost:8080/RestfulAngular/rest/stock/updateStock',
            data : angular.toJson(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function successCallback(response) {
        	if(response.status === 200){
        		notyFun('儲存成功', 'success', 'defaultTheme');
        		$scope.getStockList($scope.account_id);
        	}
        },function errorCallback(response) {
        	notyFun('儲存失敗', 'error', 'defaultTheme');
        });
    };
    
    $scope.deleteEdit = function(stock) {
		console.log("delete user in");
		$scope.id = stock.id;
		$scope.stockId = stock.stockId;
		$scope.stockName = stock.stockName;
		$scope.account_id = stock.account_id;
    };
    
    $scope.deleteClick = function() {
		console.log("delete click in");
		$http({
            method : 'DELETE',
            url : 'http://localhost:8080/RestfulAngular/rest/stock/deleteStock/'+ $scope.id
        }).then(function successCallback(response) {
        	console.log(response);
        	if(response.status === 200){
        		notyFun('刪除成功', 'success', 'defaultTheme');
        		$scope.getStockList($scope.account_id);
        	}
        }, function errorCallback(response) {
        	console.log(response);
        	notyFun('刪除失敗', 'error', 'defaultTheme');
        });
    };
    
	var chart = AmCharts.makeChart( "chartdiv", {
		  "type": "gauge",
		  "theme": "light",
		  "startDuration": 0.3,
		  "marginTop": 20,
		  "marginBottom": 50,
		  "axes": [ {
		    "axisAlpha": 0.3,
		    "endAngle": 360,
		    "endValue": 12,
		    "minorTickInterval": 0.2,
		    "showFirstLabel": false,
		    "startAngle": 0,
		    "axisThickness": 1,
		    "valueInterval": 1
		  } ],
		  "arrows": [ {
		    "radius": "50%",
		    "innerRadius": 0,
		    "clockWiseOnly": true,
		    "nailRadius": 10,
		    "nailAlpha": 1
		  }, {
		    "nailRadius": 0,
		    "radius": "80%",
		    "startWidth": 6,
		    "innerRadius": 0,
		    "clockWiseOnly": true
		  }, {
		    "color": "#CC0000",
		    "nailRadius": 4,
		    "startWidth": 3,
		    "innerRadius": 0,
		    "clockWiseOnly": true,
		    "nailAlpha": 1
		  } ],
		  "export": {
		    "enabled": true
		  }
		} );

		// update each second
		setInterval( updateClock, 1000 );

		// update clock
		function updateClock() {
		  if(chart.arrows.length > 0){
		    // get current date
		    var date = new Date();
		    var hours = date.getHours();
		    var minutes = date.getMinutes();
		    var seconds = date.getSeconds();

		    if(chart.arrows[ 0 ].setValue){
		      // set hours
		      chart.arrows[ 0 ].setValue( hours + minutes / 60 );
		      // set minutes
		      chart.arrows[ 1 ].setValue( 12 * ( minutes + seconds / 60 ) / 60 );
		      // set seconds
		      chart.arrows[ 2 ].setValue( 12 * date.getSeconds() / 60 );
		      }
		  }
		}
}]);