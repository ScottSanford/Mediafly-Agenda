angular.module('agendaApp')

	.controller('DoubleCheckCtrl', function($scope, $routeParams, EditControlsService, InitAgendaService){

		for (var i = 0; i < InitAgendaService.data.length; i++) {
            $scope.title = InitAgendaService.data[i].title;
        }

		$scope.deleteAgendaFromList = function(index) {
            if ($routeParams.id === undefined) {
              console.log($routeParams.id);
               EditControlsService.deleteAgenda(index,1);
            } else {
              for (var i = 0; i < InitAgendaService.data.length; i++) {
                if ($routeParams.id === InitAgendaService.data[i].id) {
                    EditControlsService.deleteAgenda(i,1);
                }
              }
            }
            $scope.closeThisDialog();
		}

        $scope.closeDialogBox = function() {
              	$scope.closeThisDialog();
        }
	});