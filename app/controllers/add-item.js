angular.module('agendaApp')

	.controller('AddAgendaItemCtrl', function($scope, EditControlsService, InitAgendaService){
            $scope.addItem = function () {
                EditControlsService.addAgendaItem($scope.newItem, InitAgendaService.data[0].title); // might need to change 2nd arg?
                $scope.newItem = '';
                $scope.closeThisDialog();
            };
	});