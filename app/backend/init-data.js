angular.module('agendaApp').run(function($httpBackend) {
  var agendaList = [
              {'name': 'Introductions', 'title': 'Agenda','checked': false},
              {'name': 'Objectives', 'title': 'Agenda','checked': false},
              {'name': 'Next Steps', 'title': 'Agenda','checked': false}
          ];

  var agendaTitle = {"title" : 'Mediafly Title'};

  // returns the current list of phones
  $httpBackend.whenGET('/data/init-data.json').respond(agendaList);
  $httpBackend.whenGET('http://127.0.0.1:8000/data/info/-agendatitle').respond(agendaTitle);

  // adds a new phone to the phones array
  // $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
  //   var phone = angular.fromJson(data);
  //   phones.push(phone);
  //   return [200, phone, {}];
  // });
  $httpBackend.whenGET(/^partials\//).passThrough();
  //...
});