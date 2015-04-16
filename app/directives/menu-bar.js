angular.module('agendaApp')

	.directive('menuBar', function(){
		return {
			retrict: 'E', 
			templateUrl: 'partials/menu-bar.html', 
			controller: 'agendaListCtrl'
		}
	})