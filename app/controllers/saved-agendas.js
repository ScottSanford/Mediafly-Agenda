angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, EditControlsService, InitAgendaService){

        $scope.agendaList = InitAgendaService.data;

	});