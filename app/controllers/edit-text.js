angular.module('agendaApp')

	.controller('EditTextCtrl', function($scope, EditControlsService, InitAgendaService){

    		$scope.title = InitAgendaService.data[0].title;

        function isItemSelected(element, index, array) {
          return element.checked;
        }

        var editList = InitAgendaService.data[0].items.filter(isItemSelected);
        $scope.agendaList = editList;

        $scope.saveEditedItems = function() {
              // 2-way data binding so just closing dialog box
              if ($scope.editAgendaText.$valid) {
              	$scope.closeThisDialog();
              }
        }

        $scope.closeDialogBox = function() {
              if ($scope.editAgendaText.$valid) {
              	$scope.closeThisDialog();
              }
        }

	});