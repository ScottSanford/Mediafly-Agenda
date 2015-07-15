angular.module('agendaApp')

	.controller('AddAgendaItemCtrl', function($scope, EditControlsService, InitAgendaService, mfly){
            $scope.addItem = function () {
            	if ($scope.addAgendaItem.$valid) {
	                EditControlsService.addAgendaItem($scope.newItem);
	                $scope.newItem = '';
	                $scope.closeThisDialog();          	
              	}
            };
	});