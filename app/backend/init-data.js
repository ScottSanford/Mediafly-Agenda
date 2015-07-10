angular.module('agendaApp').run(function($httpBackend) {

  var agendaList = [
                      {
                      "title": "Mediafly Agenda",
                      "dateCreated": 1434752671392, 
                      "id": "mediafly123",
                      "items": [
                        {"name": "Mediafly Intro","checked": false},
                        {"name": "Mediafly Middle","checked": false},
                        {"name": "Mediafly Conclusion", "checked": false}
                      ]
                      },
                      {
                      "title": "Miller Coors Agenda",
                      "dateCreated": 1334752671392, 
                      "id": "millercoors456",
                      "items": [
                        {"name": "Miller Coors Intro","checked": false},
                        {"name": "Miller Coors Middle","checked": false},
                        {"name": "Miller Coors Conclusion", "checked": false}
                      ]
                      },
                      {
                      "title": "PepsiCo Agenda",
                      "dateCreated": 1234752671392, 
                      "id": "pepsico789",
                      "items": [
                        {"name": "PepsiCo Intro","checked": false},
                        {"name": "PepsiCo Middle","checked": false},
                        {"name": "PepsiCo Conclusion", "checked": false}
                      ]
                      }
                    ]



  // returns the current list of phones

  $httpBackend.whenGET('/data/test-data.json').passThrough();

  // adds a new phone to the phones array
  // $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
  //   var phone = angular.fromJson(data);
  //   phones.push(phone);
  //   return [200, phone, {}];
  // });
  $httpBackend.whenGET(/^partials\//).passThrough();
  //...
});