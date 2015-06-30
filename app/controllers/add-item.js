angular.module('agendaApp')

	.controller('AddAgendaItemCtrl', function($scope, EditControlsService, InitAgendaService){
            $scope.addItem = function () {
            	if ($scope.addAgendaItem.$valid) {
	                EditControlsService.addAgendaItem($scope.newItem);
	                $scope.newItem = '';
	                $scope.closeThisDialog();          	
              	}
            };
	});