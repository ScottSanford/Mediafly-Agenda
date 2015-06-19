angular.module('agendaApp')


.factory('DialogService',function (ngDialog) {

	return {

		// pass $scope into function arguments
		createDialogBox: function(tmpl, clName, ctrl) {
			ngDialog.open({
                template: tmpl,
                className: clName, 
                controller: ctrl
            });
		}

}
});
