angular.module('agendaApp')

	.controller('EditTextCtrl', function($scope, EditControlsService, InitAgendaService){

		function isItemSelected(element, index, array) {
			return element.checked;
		}

		var editList = InitAgendaService.data.filter(isItemSelected);
		$scope.agendaList = editList;

		console.log(InitAgendaService.data[0].title);

        $scope.saveEditedItems = function() {
              // 2-way data binding so just closing dialog box
              $scope.closeThisDialog();
        }

        $scope.closeDialogBox = function() {
              $scope.closeThisDialog();
        }

	});