angular.module('agendaApp',[
		'ngRoute', 
		'ngAnimate', 
		'ngTouch', 
		'ngDraggable',
		'xeditable',
		'angular-growl',
		'hmTouchEvents',
		'Mediafly.services'
	])

	.run(function(editableOptions) {
  		editableOptions.theme = 'bs3'; 
	})

	.config(function ($routeProvider, growlProvider) {	        
	        $routeProvider
	        	.when('/', {
	        		templateUrl: "partials/agenda-list.html"    		
	        	})
	            .otherwise({
	                redirectTo: '/'
	            });
	        growlProvider.globalTimeToLive(2000);
	        growlProvider.globalDisableCountDown(true);
	})

