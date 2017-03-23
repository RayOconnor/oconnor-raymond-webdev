module.exports = function () {

  var api = {
    createWebsiteForUser: createWebsiteForUser,
    findWebsiteById: findWebsiteById,
    findAllWebsitesForUser: findAllWebsitesForUser,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite,
    addPageToWebsite: addPageToWebsite
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var websiteSchema = require('./website.schema.server')();
  var websiteModel = mongoose.model('websiteModel', websiteSchema);

  return api;

  function createWebsiteForUser(website) {
    var d = q.defer();
    
    websiteModel.create(website, function (err, website) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve(website);
      }
    });
    return d.promise;
  }

  function addPageToWebsite(page) {
    var d = q.defer();

    websiteModel
      .findById(page._website, function (err, website) {
        if(err) {
          d.reject(err);
        } else {
          website.pages.push(page._id);
          website.save();
          d.resolve(page);
        }
      });

    return d.promise;
  }

  function findWebsiteById(websiteId) {
    var d = q.defer();

    websiteModel
      .findById(websiteId, function (err, website) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(website);
        }
      });

    return d.promise;
  }

  function findAllWebsitesForUser(userId) {
    var d = q.defer();

    websiteModel
      .find({_user: userId}, function (err, websites) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(websites);
        }
      });

    return d.promise;

  }

  function updateWebsite(websiteId, website) {
    var d = q.defer();

    websiteModel
      .findOneAndUpdate({'_id': websiteId}, website, function (err, website) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(website);
        }
      });

    return d.promise;
  }

  function deleteWebsite(websiteId) {
    var d = q.defer();

    websiteModel
      .remove({'_id': websiteId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }
};