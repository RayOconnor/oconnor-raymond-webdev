module.exports = function (app, userModel) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function createUser(req, res) {
    var newUser = req.body;
    userModel
      .createUser(newUser)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function findUserById(req, res) {
    var uid = req.params.userId;
    userModel
      .findUserById(uid)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    
    if(username && password) {
      findUserByCredentials(req, res);
    } else if(username) {
      findUserByUsername(username, req, res);
    }
    return;
  }

  function findUserByUsername(username, req, res) {
    userModel
      .findUserByUsername(username)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    userModel
      .findUserByCredentials(username, password)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var newUser = req.body;
    userModel
      .updateUser(userId, newUser)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
      .deleteUser(userId)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

}