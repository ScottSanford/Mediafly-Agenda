angular.module('agendaApp')

	.controller('DoubleCheckCtrl', function($scope, $rootScope, EditControlsService, InitAgendaService){

		for (var i = 0; i < InitAgendaService.data.length; i++) {
            $scope.title = InitAgendaService.data[i].title;
        }

		$scope.deleteAgenda = function() {
        	for (var i = 0; i < InitAgendaService.data.length; i++) {
        			EditControlsService.deleteAgenda(i,1);
            }
            $scope.closeThisDialog();
		}

        $scope.closeDialogBox = function() {
              	$scope.closeThisDialog();
        }
	});