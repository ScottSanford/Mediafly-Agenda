angular.module('agendaApp')

	.controller('SavedAgendasCtrl', function($scope, $location, $routeParams, EditControlsService, InitAgendaService, DialogService){

		$scope.title = InitAgendaService.data[0].title;

        $scope.agendaList = InitAgendaService.data;

        $scope.saveAgendatoList = function() {
        	EditControlsService.saveAndLoadAgenda(InitAgendaService.data[0].title, InitAgendaService.data[0].items);
        	console.log(InitAgendaService.data);
        	$scope.closeThisDialog();
        }

        $scope.deleteAgendaDialogBox = function(index) {
         	DialogService.createDialogBox('partials/double-check-dialogbox.html', 'ngdialog-theme-plain', 'DoubleCheckCtrl');
        }

	});