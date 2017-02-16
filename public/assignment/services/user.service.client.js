(function(){
  angular
    .module("WebAppMaker")
    .factory('UserService', userService);

  function userService() {
    var users = [
      {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "aw@gmail.com" },
      {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bm@gmail.com" },
      {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cg@gmail.com" },
      {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "ja@gmail.com" }
    ];

    var nextId = 0;
    var api = {
      "users": users,
      "createUser": createUser,
      "findUserById": findUserById,
      "findUserByUsername": findUserByUsername,
      "findUserByCredentials": findUserByCredentials,
      "updateUser": updateUser,
      "deleteUser": deleteUser
    };
    return api;

    function createUser(newUser) {
      //if (this.findUserByUsername(newUser.username) == null) {
        newUser._id = nextId.toString();
        nextId += 1;
        users.push(newUser)
        return newUser
      /*
      } else {
        return null;
      }
      */
    }

    function findUserById(uid) {
      for(var u in users) {
        var user = users[u];
        if( user._id === uid ) {
          return angular.copy(user);
        }
      }
      return null;
    }

    function findUserByUsername(username) {
      for(var u in users) {
        var user = users[u];
        if( user.username === username ) {
          return angular.copy(user);
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      for(var u in users) {
        var user = users[u];
        if( user.username === username &&
          user.password === password) {
          return angular.copy(user);
        }
      }
      return null;
    }

    function updateUser(userId, newUser) {
      for(var u in users) {
        var user = users[u];
        if( user._id === userId ) {
          users[u].firstName = newUser.firstName;
          users[u].lastName = newUser.lastName;
          return user;
        }
      }
      return null;
    }

    function deleteUser(userId) {
      for(var u in users) {
        var user = users[u];
        if (user._id === userId) {
          users.splice(w,1);
        }
      }
    }
  }
})();