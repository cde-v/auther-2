'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/auth/:provider', function () {
    window.location.reload();
});
});

// { "_id" : "VkzyRLS29l",
// "name" : "Josie Vargas",
// "phone" : "(768) 970-5682",
// "email" : "zuav@om.gov",
// "password" : "ki",
// "isAdmin" : false,
// "photo" : "http://api.randomuser.me/portraits/thumb/women/30.jpg",
// "__v" : 0 }
