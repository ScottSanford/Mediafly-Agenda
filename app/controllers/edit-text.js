angular.module('agendaApp')

  .controller('EditTextCtrl', function($rootScope, $scope, $routeParams, EditControlsService, NewAgendaService, InitAgendaService, mfly){

        function isItemSelected(element, index, array) {
          return element.checked;
        }

        if ($routeParams.id === undefined) {
          
          $scope.title = NewAgendaService.title;

          var editList = NewAgendaService.items.filter(isItemSelected);
          $scope.agendaList = editList;

        } 
        else {

          for (var i = 0; i < InitAgendaService.data.length; i++) {

            if ($routeParams.id === InitAgendaService.data[i].id) {

              $scope.title = InitAgendaService.data[i].title;

              var itemsArray = InitAgendaService.data[i].items[0].items;
              
              var editList = itemsArray.filter(isItemSelected);
              $scope.agendaList = editList;

              var savedAgendaList = InitAgendaService.data;
              mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

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