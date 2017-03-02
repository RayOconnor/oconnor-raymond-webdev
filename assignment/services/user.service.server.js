module.exports = function (app) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "aw@gmail.com"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bm@gmail.com"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "cg@gmail.com"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "ja@gmail.com"}
  ];

  var nextId = 0;

  function createUser(req, res) {
    newUser = req.body;
    newUser._id = nextId.toString();
    nextId += 1;
    users.push(newUser)
    res.json(newUser)

  }

  function findUserById(req, res) {
    var uid = req.params.userId
    for (var u in users) {
      if (users[u]._id === uid) {
        res.json(users[u]);
        return;
      }
    }
  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    
    if(username && password) {
      findUserByCredentials(req, res);
    } else if(username) {
      findUserByUsername(req, res);
    }
    return;
  }

  function findUserByUsername(req, res) {
    var username = req.query.username;
    for (var u in users) {
      if (users[u].username === username) {
        res.json(users[u])
      }
    }
  }

  function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    console.log("find user by credentials HTTP service");
    for (var u in users) {
      var user = users[u];
      if (user.username === username &&
        user.password === password) {
        res.json(users[u]);
      }
    }
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var newUser = req.body;
    for (var u in users) {
      var user = users[u];
      if (user._id === userId) {
        users[u].firstName = newUser.firstName;
        users[u].lastName = newUser.lastName;
        res.json(users[u]);
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    for (var u in users) {
      var user = users[u];
      if (user._id === userId) {
        users.splice(w, 1);
      }
    }
  }

}