angular.module('agendaApp')

	.controller('ReplaceSavedCtrl', function($scope, $location, $routeParams, $q, MflyDataService, EditControlsService, InitAgendaService, NewAgendaService, DialogService, mfly){

        // if ($routeParams.id === undefined) {
        //     $scope.newAgenda = {
        //         title: $scope.newAgenda.title
        //     }
        // } else {
            for (var i = 0; i < InitAgendaService.data.length; i++) {
                if ($routeParams.id === InitAgendaService.data[i].id) {
                    $scope.title = InitAgendaService.data[i].title;         
                }
            }
        // }
        $scope.agendaList = InitAgendaService.data;

        $scope.replaceSavedAgenda = function() {

            // push object into Saved Agendas array
            // for (var i = 0; i < InitAgendaService.data.length; i++) {
            //     if ($routeParams.id === InitAgendaService.data[i].id) {
            //         InitAgendaService.data[i] = EditControlsService.replaceSavedAgenda($scope.newAgenda.title, $routeParams.id, NewAgendaService.items);
            //         break;
            //     }
            // }

            function findAndReplace(object, title, id, items){
              for(var prop in object){
                if(object[prop] == $routeParams.id){ 
                  object["title"] = title;
                  object["id"] = id;
                  object["items"] = items;
                  break;
                }
              }
            }

            findAndReplace(InitAgendaService.data, $scope.newAgenda.title, $routeParams.id, $scope.agendaList);

            // save for local storage
            var savedAgendaList = InitAgendaService.data;

            mfly.putValue('agendalist', JSON.stringify(savedAgendaList));

        	console.log("Saved Agendas ==> " , InitAgendaService.data);
        	$scope.closeThisDialog();

        }

        $scope.closeDialogBox = function() {
            $scope.closeThisDialog();
        }

	});