angular.module('agendaApp')

	.controller('DoubleCheckCtrl', function($scope, $routeParams, EditControlsService, InitAgendaService, DialogService){

		for (var i = 0; i < InitAgendaService.data.length; i++) {
          if ($routeParams.id === InitAgendaService.data[i].id) {
            $scope.title = InitAgendaService.data[i].title;
          }
    }

		$scope.deleteAgendaFromList = function() {
        for (var i = 0; i < InitAgendaService.data.length; i++) {
          if ($routeParams.id === InitAgendaService.data[i].id) {
            EditControlsService.deleteAgenda(i,1);
            $scope.closeThisDialog();
            break;
          }
        }
		}

    $scope.closeDialogBox = function() {
          	$scope.closeThisDialog();
    }
	});