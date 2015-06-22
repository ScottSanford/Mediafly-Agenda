angular.module('agendaApp',[
		'ngRoute', 
		'ngAnimate', 
		'ngTouch', 
		'hmTouchEvents',
		'Mediafly.services', 
		'ngDialog',
		'ui.sortable', 
		'ngMockE2E', 
		'ngMessages'
	])

	.config(function ($routeProvider, $compileProvider) {
			$compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/image|http:\/\/)/);	        
	        $routeProvider
	        	.when('/:id', {
	        		templateUrl: "partials/agenda.html",
	        		controller: 'agendaListCtrl',
	        		resolve: {
							agendaData: function(InitAgendaService){
								return InitAgendaService.get();
							}
						}    		
	        	})
	        	.when('/', {
	        		templateUrl: "partials/agenda.html",
	        		controller: 'agendaListCtrl',
	        		resolve: {
							agendaData: function(InitAgendaService){
								return InitAgendaService.get();
							}
						}    		
	        	})
	            .otherwise({
	                redirectTo: '/'
	            });
	})

