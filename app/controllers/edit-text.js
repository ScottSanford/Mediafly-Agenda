angular.module('agendaApp')

  .controller('EditTextCtrl', function($rootScope, $scope, $routeParams, EditControlsService, NewAgendaService, InitAgendaService){

        function isItemSelected(element, index, array) {
          return element.checked;
        }

        if ($routeParams.id === undefined) {
          console.log(NewAgendaService);
          $scope.title = NewAgendaService.title;
          var editList = NewAgendaService.items.filter(isItemSelected);
          $scope.agendaList = editList;
        } else {
          for (var i = 0; i < InitAgendaService.data.length; i++) {
            if ($routeParams.id === InitAgendaService.data[i].id) {
              $scope.title = InitAgendaService.data[i].title;
              console.log(InitAgendaService.data[i].items);
              var editList = InitAgendaService.data[i].items.filter(isItemSelected);
              $scope.agendaList = editList;
            }
          }
        }

        $scope.saveEditedItems = function() {
              // 2-way data binding so just closing dialog box
              if ($scope.editAgendaText.$valid) {
                $scope.closeThisDialog();
                console.log($scope.newAgenda.title);
              }
        }

        $scope.closeDialogBox = function() {
              if ($scope.editAgendaText.$valid) {
                $scope.closeThisDialog();
              }
        }

  });