angular.module('agendaApp')

	.controller('agendaListCtrl', function($scope, mfly, MflyDataService, growl){

        $scope.agenda = "Agenda";

		$scope.closeApp = function() {
			mfly.close();
		}

        function initalizeAgenda() {
            MflyDataService.load('agendaList')
                .then(function(result){
                    $scope.agendaList = result.data;
                }, function(result){
                    console.log("Can't retreive agendaList. Setting default agendaList");
                    $scope.agendaList = [
                        { 'id': '0', 'name': 'Introductions'},
                        { 'id': '1', 'name': 'Objectives'},
                        { 'id': '2', 'name': 'Next Steps'}
                    ];   
                });
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
            growl.success("Template has been saved!");
        }

        // load button
        $scope.loadAgendaFromTemplate = function() {
            MflyDataService.load('agendaList', false).then(function(result){
                console.log(result.data);
                // var data = result.data;
                // var spaceInString = data.replace("+", "");
                // console.log(spaceInString.data);
                $scope.agendaList = result.data;
                $scope.saveAgenda();
                growl.success("Template has loaded successfully!");
            });
        }

        // close button
        $scope.closeMenu = function() {
            $scope.showActions = false;
            $scope.showEditButtons = false;
        }
        // AGENDA MENU END

        // add item to agenda list
        $scope.add = function(e) {
            if (e.keyCode === 13) {
                var newlyAddedItem = {
                    id: null,
                    name: $scope.newItem
                }
                $scope.agendaList.push(newlyAddedItem);
                $scope.newItem = '';
            }
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