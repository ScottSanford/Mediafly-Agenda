angular.module('agendaApp')

	.controller('AddAgendaItemCtrl', function($scope, EditControlsService){
            $scope.add = function () {
                EditControlsService.addAgendaItem($scope.name, $scope.title);
                $scope.newItem = '';
            };
	});