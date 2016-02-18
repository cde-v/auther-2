'use strict';

app.controller('SignupCtrl', function($scope, Auth) {
  $scope.submitSignup = function(email, password) {
    Auth.signup(email, password)
      .then(function(res) {
        if(res.data._id) Auth.login(res.data.email, res.data.password);
      });
  };
});
