angular.module('agendaApp')

    .filter('removePlusSign' , function(){
        return function(name) {
            var text = item.replace("+", " ");
            return String(text);
        }
    })

	.controller('agendaListCtrl', function($scope, $rootScope, $routeParams,  mfly, MflyDataService, EditControlsService, InitAgendaService, DialogService){

        function initalizeAgenda() {
            $scope.agendaList = InitAgendaService.data[0].items;
            $scope.title = InitAgendaService.data[0].title;
        }

        if ($routeParams.id === undefined) {
            initalizeAgenda();
        } else {
            for (var i = 0; i < InitAgendaService.data.length; i++) {
                if ($routeParams.id === InitAgendaService.data[i].id) {
                    $scope.agendaList = InitAgendaService.data[i].items;
                    $scope.title = InitAgendaService.data[i].title;
                }
            }
        }

        // AGENDA MENU START
        // open menu 
        $scope.openMenu = function() {
            $scope.showActions = true;
        }

        /** Save the agenda with AJAX.**/
        $scope.saveAgenda = function(useNamespace) {
            useNamespace = typeof useNamespace !== 'undefined' ? useNamespace : true;
            MflyDataService.save('agendaList', JSON.stringify($scope.agendaList), useNamespace);
        }

        // save button
        $scope.saveAgendaToTemplate = function() {
            MflyDataService.save('agendaList', JSON.stringify($scope.agendaList), false);         
            MflyDataService.save('agendaTitle', $scope.agenda.title, false);         
        }

        // load button
        $rootScope.savedAgendasDialogBox = function() {
            DialogService.createDialogBox('partials/saved-agendas.html', 'ngdialog-theme-plain custom-width', 'SavedAgendasCtrl');
        }

        $scope.loadAgendaFromTemplate = function() {
            MflyDataService.load('agendaList', false).then(function(result){
                console.log(result.data);
                $scope.agendaList = result.data;
                $scope.saveAgenda();
            });
            MflyDataService.load('agendaTitle', false).then(function(result){
                $scope.agenda.title = result.data;
            })
        }

        // Edit Controls (add, save, edit, delete)

        $scope.addDialogBox = function() {
            DialogService.createDialogBox('partials/add-item.html', 'ngdialog-theme-plain', 'AddAgendaItemCtrl');
        };

        $scope.editDialogBox = function(item){
             DialogService.createDialogBox('partials/edit-text.html', 'ngdialog-theme-plain', 'EditTextCtrl');
        };

        $scope.deleteDialogBox = function() { 
                var itemsArray = InitAgendaService.data[0].items;
                for (i = 0; i < itemsArray.length; i++) {
                    if (itemsArray[i].checked) {
                        DialogService.createDialogBox('partials/delete-items.html', 'ngdialog-theme-plain', 'DeleteItemCtrl');
                    }
                }
        };

        $scope.saveDialogBox = function() { 
                DialogService.createDialogBox('partials/save-load-agenda.html', 'ngdialog-theme-plain', 'SavedAgendasCtrl');
        };

        // AGENDA MENU END
        $scope.saveAndCloseEdit = function() {
            saveAgendatotemplate();
        }

        // trash dialog 

        // remove item from agenda list
        $scope.removeItem = function(index) {
            // var item = $scope.agendaList[index];
            $scope.agendaList.splice(index, 1);
        }


	})