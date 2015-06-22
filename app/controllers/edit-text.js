angular.module('agendaApp')

	.controller('EditTextCtrl', function($scope, $routeParams, EditControlsService, InitAgendaService){

        function isItemSelected(element, index, array) {
          return element.checked;
        }

        if ($routeParams.id === undefined) {
          $scope.title = InitAgendaService.data[0].title;
        } else {
          for (var i = 0; i < InitAgendaService.data.length; i++) {
            if ($routeParams.id === InitAgendaService.data[i].id) {
              $scope.title = InitAgendaService.data[i].title;
              var editList = InitAgendaService.data[i].items.filter(isItemSelected);
              $scope.agendaList = editList;
            }
          }
        }

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