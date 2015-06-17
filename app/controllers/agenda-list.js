angular.module('agendaApp')

    .filter('removePlusSign' , function(){
        return function(name) {
            var text = item.replace("+", " ");
            return String(text);
        }
    })

	.controller('agendaListCtrl', function($scope, mfly, MflyDataService, EditControlsService, InitAgendaService, ngDialog){

        $scope.agenda = {
            title: 'New Agenda'
        } 

        function initalizeAgenda() {
            $scope.agendaList = InitAgendaService.data;

            // agenda Title
            MflyDataService.load('agendatitle')
                .then(function(result){
                    $scope.agenda.title = result.data.title;
                }, function(result){
                    $scope.agenda.title = "Meeting Agenda"
                })

        }

        initalizeAgenda();

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

        // edit text 
        $scope.editorEnabled = false;

        // enable in place text editor
        $scope.enableEditor = function(index) {
            $scope.editorEnabled = true;
            $scope.editableTitle = $scope.agendaList[index].name;
        }

        //cancel in place text editor
        $scope.disableEditor = function() {
            $scope.editorEnabled = false;
        }

        $scope.save = function(index) {
            console.log($scope.agendaList[index].name);
            $scope.agendaList[index].name = $scope.editableTitle;
            // $scope.disableEditor();
        }

        // add item to agenda list

        $scope.addAgendaItem = function() {
            ngDialog.open({
                template: 'partials/add-agenda-item.html',
                className: 'ngdialog-theme-plain', 
                controller: 'AddAgendaItemCtrl', 
                controllerAs: 'controller', 
                scope: $scope
            });
        }

        $scope.editText = function(item){
            ngDialog.open({
                template: 'partials/edit-text.html', 
                className: 'ngdialog-theme-plain', 
                controller: ['$scope', function($scope){

                }]
            })
        };

        // close button
        $scope.saveDialogBox = function() {
            ngDialog.open({
                template: 'partials/save-load-agenda.html', 
                className: 'ngdialog-theme-plain'
            });    
        }

        $scope.saveAndCloseEdit = function() {
            saveAgendatotemplate();
        }
        // AGENDA MENU END

        // trash dialog 
        $scope.trashDialog = function() {
            ngDialog.open({
                template: 'partials/trash-items.html', 
                className: 'ngdialog-theme-plain'
            })
        }

        // remove item from agenda list
        $scope.removeItem = function(index) {
            // var item = $scope.agendaList[index];
            $scope.agendaList.splice(index, 1);
        }

        // highlight agenda item
        $scope.isSelected = function() {
           $scope.agendaList.selected = true;
        }

        
        mfly.search().then(function(data){
            $scope.thumbnailUrl = data[0].thumbnailUrl;
        });


	})