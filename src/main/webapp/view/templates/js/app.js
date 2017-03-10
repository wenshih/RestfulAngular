var app = angular.module('demo', ['ui.router', 'datatables','ngCookies','ngRoute']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');
	$stateProvider
    .state('app',{
        url: '/',
        views: {
            'header': {
                templateUrl: 'view/templates/html/layout/header.html',
                controller: "headerCtrl",
            },
            'content': {
                templateUrl: 'view/templates/html/layout/content.html',
            },
            'footer': {
                templateUrl: 'view/templates/html/layout/footer.html',
            }
        }
    })
    .state('app.home', {
        url: 'home',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/common/home.html',
                controller: 'homeCtrl'
            }
        }
 
    })
    .state('app.registered', {
        url: 'registered',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/common/registered.html',
                controller: 'registeredCtrl'
            }
        }
 
    })
    .state('app.login', {
        url: 'login',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/common/login.html',
                controller: 'loginCtrl'
            }
        }
 
    })
    .state('app.logout', {
        url: 'logout',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/common/logout.html',
                controller: 'logoutCtrl'
            }
        }
 
    })
	.state('app.dashboard', {
        url: 'dashboard',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/personal/dashboard.html',
                controller: 'dashboardCtrl'
            }
        }
 
    })
    .state('app.userAccount', {
        url: 'userAccount',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/manager/userAccount.html',
                controller: 'userAccountCtrl'
            }
        }
 
    })
    .state('app.adminAccount', {
        url: 'adminAccount',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/manager/adminAccount.html',
                controller: 'adminAccountCtrl'
            }
        }
 
    })
    .state('app.permission', {
        url: 'permission',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/manager/permission.html',
                controller: 'permissionCtrl'
            }
        }
 
    })
    .state('app.profile', {
        url: 'profile',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/personal/profile.html',
                controller: 'profileCtrl'
            }
        }
    })
    .state('app.stock', {
        url: 'stock',
        views: {
            'content@': {
                templateUrl: 'view/templates/html/personal/stock.html',
                controller: 'stockCtrl'
            }
        }
    })
}]);