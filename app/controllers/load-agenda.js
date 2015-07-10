angular.module('agendaApp')

  .controller('LoadAgendaCtrl', function($scope, $routeParams, MflyDataService, EditControlsService, NewAgendaService, InitAgendaService, mfly){

        $scope.loadAgenda = function() {
        	
            mfly.getValue('agendaList').then(function(response){
                    var data = JSON.parse(response);

                    for (var i = 0; i < data.length; i++) {
                        if (data[data.length-1]) {

                            $scope.newAgenda = {
                                title: data[i].title
                            }

                            $scope.agendaList = data[i].items[i].itemName;
                            console.log($scope.newAgenda.title , $scope.agendaList);
                        }
                    }
        	});
            $scope.closeThisDialog();
        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

  });