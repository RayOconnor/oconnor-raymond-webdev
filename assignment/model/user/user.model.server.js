module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    addWebsiteToUser: addWebsiteToUser,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var userSchema = require('./user.schema.server')();
  var userModel = mongoose.model('userModel', userSchema);
  
  return api;

  function createUser(user) {
    return userModel.create(user);
  }
  
  function addWebsiteToUser(website) {
    var d = q.defer();

    userModel
      .findById(website._user, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.websites.push(website._id);
          user.save();
          d.resolve(website);
        }
      });

    return d.promise;
  }

  function findUserById(userId) {
    var d = q.defer();

    userModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function findUserByUsername(username) {
    var d = q.defer();

    userModel
      .findOne({'username': username}, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function findUserByCredentials(username, password) {
    var d = q.defer();

    userModel
      .findOne({'username': username, 'password': password}, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function updateUser(userId, user) {
    var d = q.defer();

    userModel
      .findOneAndUpdate({'_id': userId}, user, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function deleteUser(userId) {
    var d = q.defer();

    userModel
      .remove({'_id': userId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }
};