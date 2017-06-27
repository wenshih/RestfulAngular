angular.module('demo').controller('stockCtrl', ['$scope', '$http', '$cookies', '$state', function($scope,$http,$cookies,$state) {

	checkCookie($cookies.get('email'), $state);
	clearCookie(setIntervalId, $cookies.get('email'));
	
	$scope.price = false;
	//$scope.priceHistory = false;
	var date = new Date();  
    var thisYear = date.getFullYear() - 1911;
    var index = 0;
    $scope.years = [];
	for(var i=81; i<=thisYear; i++){
		$scope.years[index] = {id : i, label : i};
		index++;
	}
	$scope.selectedYear = $scope.years[$scope.years.length-1];
	
	var thisMonth = date.getMonth()+1;
	$scope.months = [{id: 1,label: '01'},
	                {id: 2,label: '02'},
					{id: 3,label: '03'},
					{id: 4,label: '04'},
					{id: 5,label: '05'},
					{id: 6,label: '06'},
					{id: 7,label: '07'},
					{id: 8,label: '08'},
					{id: 9,label: '09'},
					{id: 10,label: '10'},
					{id: 11,label: '11'},
					{id: 12,label: '12'}];
	$scope.selectedMonth = $scope.months[thisMonth-1];
	
	$scope.searchHistory = function() {
		console.log("searchHistory in");
		
		var selectedYear = $scope.selectedYear.id+1911;
		
		var data = {"stockId":$scope.stockIdHistory, "year":selectedYear, "month":$scope.selectedMonth.label, "date":date.getDate()}
		
		$http({
            method : "POST",
            url : 'http://localhost:8080/RestfulAngular/rest/stock/getStockHistory',
            data : angular.toJson(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function successCallback(response) {
        	if(response.status === 200){
        		console.log(response.data);
        		$("#historyHeader").html("");
        		$("#historyContent").html("");
        		var header = "";
        		var headerList = response.data[2];
        		headerList = headerList.split(" ");
        		for(var i=0;i<headerList.length;i++){
        			header += "<th class=\"borderCss\">"+headerList[i]+"</th>";
        		}
        		$("#historyHeader").append(header);
        		
        		var content = "";
        		var contentList = (response.data[1]).split(" ");
        		for(var i=0;i<contentList.length;i++){
        			if(i%9 === 0){
        				content += "<tr>";
        				content += "<td class=\"borderCss\">"+contentList[i]+"</td>";
        				
        			}else{
        				content += "<td class=\"borderCss\">"+contentList[i]+"</td>";
        				if((i+1)%9 === 0){
        					content += "</tr>";
        				}
        			}
        		}
        		$("#historyContent").append(content);
        		var history = [];
        		var tmp = "";
        		for(var k=0; k<$("#historyContent").find("tr").length; k++){
        			var tr = $("#historyContent").find("tr")[k];
        			for(var j=0; j<tr.children.length; j++){
        				var td = tr.children[j];
        				if(j == 0){
        					var old = td.innerHTML.replace(/\//g,"");
        					var newD = 19110000 + parseInt(old);
        					var year = String(newD).substring(0,4)+"-";
        					var month = String(newD).substring(4,6)+"-";
        					var date = String(newD).substring(6,8);
        					tmp = year+month+date;
        				}
        				if(j === 6){
        					history.push({"date": tmp,"value": td.innerHTML});
        				}
        			}
        		}
        		
        		$scope.chart(history);
        		/*
        		console.log(response.data);
        		$("#historyHeader").html("");
        		$("#historyContent").html("");
        		var header = "";
        		var headerList = ["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"];
        		for(var i=0;i<headerList.length;i++){
        			header += "<th class=\"borderCss\">"+headerList[i]+"</th>";
        		}
        		$("#historyHeader").append(header);
        		$("#historyContent").append(response.data);
        		var history = [];
        		var tmp = "";
        		for(var k=0; k<$("#historyContent").find("tr").length; k++){
        			var tr = $("#historyContent").find("tr")[k];
        			for(var j=0; j<tr.children.length; j++){
        				var td = tr.children[j];
        				if(j == 0){
        					var old = td.innerHTML.replace(/\//g,"");
        					var newD = 19110000 + parseInt(old);
        					var year = String(newD).substring(0,4)+"-";
        					var month = String(newD).substring(4,6)+"-";
        					var date = String(newD).substring(6,8);
        					tmp = year+month+date;
        				}
        				if(j === 6){
        					history.push({"date": tmp,"value": td.innerHTML});
        				}
        			}
        		}
        		$scope.chart(history);
        		*/
        	}
        },function errorCallback(response) {
        	notyFun('查詢失敗', 'error', 'defaultTheme');
        });
		
    };
    
	$scope.search = function() {
		console.log("search in");
		
		if(!_.isUndefined($scope.stockId) && !_.isNull($scope.stockId)){
			
			var data = {"stockId":$scope.stockId}
			
			$http({
	            method : "POST",
	            url : 'http://localhost:8080/RestfulAngular/rest/stock/getStock',
	            data : angular.toJson(data),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
	        }).then(function successCallback(response) {
	        	if(response.status === 200){
	        		console.log(response.data);
	        		if(response.data.length === 0){
	        			$scope.price = false;
	        			$("#sHeader").html("");
	        	    	$("#sContent").html("");
	        			notyFun('查詢失敗', 'error', 'defaultTheme');
	        		}else{
	        			$scope.price = true;
		        		$("#sHeader").html("");
			        	$("#sContent").html("");
		        		var header = "";
		        		var content = "";
		        		for(var i=0;i<response.data.length;i++){
			        		if(i%2 === 0){
			        			if(i != 22){//濾掉個股資料
			        				header += "<th class=\"borderCss\">"+response.data[i]+"</th>";
			        			}
			        		}else{
			        			var dataNew = "";
			        			if(response.data[i].split(" ").length > 1){
			        				dataNew = response.data[i].split(" ")[0];
			        			}else{
			        				dataNew = response.data[i];
			        			}
			        			content += "<td class=\"borderCss\">"+dataNew+"</td>";
			        		}
			        	}
			        	$("#sHeader").append(header);
			        	$("#sContent").append(content);
	        		}
	        	}
	        },function errorCallback(response) {
	        	notyFun('查詢失敗', 'error', 'defaultTheme');
	        });
		}else{
			notyFun('請輸入股票代號', 'warning', 'defaultTheme');
		}
    };
    
    
    $scope.add = function() {
    	console.log("add stock");
    	//get account_id
    	var account_id = "";
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
        		$scope.addStock(account_id);
        	}
        },function errorCallback(response) {
        	notyFun('Error', 'error', 'defaultTheme');
        });
    	
    	
    };
    
    $scope.addStock = function(account_id) {
    	//insert stock
    	var data = {"account_id":account_id, "stockId":$scope.stockId};
    	
    	$http({
    		method : "POST",
    		url : 'http://localhost:8080/RestfulAngular/rest/stock/insert',
    		data : angular.toJson(data),
    		headers : {
    			'Content-Type' : 'application/json'
    		}
    	}).then(function successCallback(response) {
        	if(response.status === 200){
        		notyFun('儲存成功', 'success', 'defaultTheme');
        	}
        	$scope.getUserProfile($scope.id);
        },function errorCallback(response) {
        	notyFun('Error', 'error', 'defaultTheme');
        });
	};
	
    $scope.clear = function() {
    	$scope.price = false;
    	$scope.stockId = "";
    	$("#sHeader").html("");
    	$("#sContent").html("");
	};
	
	$scope.clearHistory = function() {
    	$scope.stockIdHistory = "";
    	$("#historyHeader").html("");
    	$("#historyContent").html("");
    	$("#chartdiv").html("");
	};
	
	$scope.chart = function(history){
		
		var chart = AmCharts.makeChart("chartdiv", {
		    "type": "serial",
		    "theme": "light",
		    "marginRight": 40,
		    "marginLeft": 40,
		    "autoMarginOffset": 20,
		    "mouseWheelZoomEnabled":true,
		    "dataDateFormat": "YYYY-MM-DD",
		    "valueAxes": [{
		        "id": "v1",
		        "axisAlpha": 0,
		        "position": "left",
		        "ignoreAxisWidth":true
		    }],
		    "balloon": {
		        "borderThickness": 1,
		        "shadowAlpha": 0
		    },
		    "graphs": [{
		        "id": "g1",
		        "balloon":{
		          "drop":true,
		          "adjustBorderColor":false,
		          "color":"#ffffff"
		        },
		        "bullet": "round",
		        "bulletBorderAlpha": 1,
		        "bulletColor": "#FFFFFF",
		        "bulletSize": 5,
		        "hideBulletsCount": 50,
		        "lineThickness": 2,
		        "title": "red line",
		        "useLineColorForBulletBorder": true,
		        "valueField": "value",
		        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
		    }],
		    "chartScrollbar": {
		        "graph": "g1",
		        "oppositeAxis":false,
		        "offset":30,
		        "scrollbarHeight": 80,
		        "backgroundAlpha": 0,
		        "selectedBackgroundAlpha": 0.1,
		        "selectedBackgroundColor": "#888888",
		        "graphFillAlpha": 0,
		        "graphLineAlpha": 0.5,
		        "selectedGraphFillAlpha": 0,
		        "selectedGraphLineAlpha": 1,
		        "autoGridCount":true,
		        "color":"#AAAAAA"
		    },
		    "chartCursor": {
		        "pan": true,
		        "valueLineEnabled": true,
		        "valueLineBalloonEnabled": true,
		        "cursorAlpha":1,
		        "cursorColor":"#258cbb",
		        "limitToGraph":"g1",
		        "valueLineAlpha":0.2,
		        "valueZoomable":true
		    },
		    "valueScrollbar":{
		      "oppositeAxis":false,
		      "offset":50,
		      "scrollbarHeight":10
		    },
		    "categoryField": "date",
		    "categoryAxis": {
		        "parseDates": true,
		        "dashLength": 1,
		        "minorGridEnabled": true
		    },
		    "export": {
		        "enabled": true
		    },
		    "dataProvider" : history
		});
		
		chart.addListener("rendered", $scope.zoomChart);
		
		$scope.zoomChart = function(){
			chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
		}
		$scope.zoomChart();
	}
	
	
}]);