angular.module('agendaApp')

  .controller('LoadAgendaCtrl', function($scope, $routeParams, EditControlsService, NewAgendaService, InitAgendaService){

        $scope.loadAgenda = function() {
            $scope.closeThisDialog();
        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

  });