angular.module('agendaApp')

	.controller('DeleteItemCtrl', function($scope, EditControlsService, InitAgendaService){

      	function isItemSelected(element, index, array) {
      		return element.checked;
      	}

      	var deletedList = InitAgendaService.data.filter(isItemSelected);
      	$scope.agendaList = deletedList;

            for (var i = 0; i < InitAgendaService.data.length; i++) {
                  if (!InitAgendaService.data[i].checked) {
                        $scope.noItemSelected = 'Please check an agenda item to be deleted.';
                  } else {
                       $scope.noItemSelected = '';
                  }
            }

            $scope.deleteItems = function() {
            	for (var i = InitAgendaService.data.length - 1; i >= 0; i--) {
            		if (InitAgendaService.data[i].checked) {
            			EditControlsService.deleteAgendaItems(i,1);
            			$scope.closeThisDialog();
            		}
            	}
            }

            $scope.closeDialogBox = function() {
                  $scope.closeThisDialog();
            }
	});