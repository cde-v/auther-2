'use strict';

app.controller('LoginCtrl', function ($scope, Auth) {
  $scope.submitLogin = function(email, password) {
    // console.log("HERE");
    Auth.login(email, password);
  };
});