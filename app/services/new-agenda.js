angular.module('agendaApp')


.factory('NewAgendaService',function () {

	return {
            "title": "Mediafly Agenda",
            "dateCreated": 1434751867, 
            "id": undefined,
            "items": [
                {"name": "Mediafly Intro","checked": false},
                {"name": "Mediafly Middle","checked": false},
                {"name": "Mediafly Conclusion", "checked": false}
            ]
	        }

});
