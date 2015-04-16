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

	.config(function ($routeProvider, $compileProvider, growlProvider) {
			$compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/image|http:\/\/)/);	        
	        $routeProvider
	        	.when('/', {
	        		templateUrl: "partials/agenda-list.html"    		
	        	})
	            .otherwise({
	                redirectTo: '/'
	            });
	        growlProvider.globalTimeToLive(3000);
	        growlProvider.globalDisableCountDown(true);
	})

