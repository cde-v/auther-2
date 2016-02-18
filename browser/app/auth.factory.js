'use strict';

app.factory('Auth', function($http, $state) {
  function Auth(props) {
    angular.extend(this, props);
  }

  Auth.val = null;

  Auth.getCurrentUser = function() {
    return Auth.val;
  };

  Auth.signup = function(email, password) {
    return $http.post('/api/users', {
      "email": email,
      "password": password
    });
  };

  Auth.login = function(email, password) {
    return $http.post('/auth/login', {
        "email": email,
        "password": password
      })
      .then(function(res) {
        if(res.statusText === "OK") {
          Auth.val = res.data.val;
          $state.go('stories');
        }
      });
  };

  Auth.logout = function() {
    return $http.delete('/auth/logout')
      .then(function() {
        $state.go('login');
      }, function(err) {
        console.error(err);
      });
  };

  Auth.isAuthenticated = function() {
    return !!Auth.val;
  };

  Auth.isAuthorized = function() {
    return $http.put('/auth/me', {
        "userId": Auth.val
      })
      .then(function(res) {
        if(res.statusText === "OK") return true
      });
  };

  return Auth;
});
