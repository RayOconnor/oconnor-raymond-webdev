module.exports = function (app, websiteModel, userModel) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  
  function createWebsite(req, res) {
    var newWebsite = req.body;
    websiteModel
      .createWebsiteForUser(newWebsite)
      .then(function(website) {
        return userModel.addWebsiteToUser(website)
      })
      .then(function(website) {
        res.json(website.toObject())
      });

  }

  function findWebsitesByUser(req, res) {
    var userId = req.params.userId;
    websiteModel
      .findAllWebsitesForUser(userId)
      .then(function(websites) {
        res.json(websites);
      }, function (error) {
        res.sendStatus(500).send(error);
      });


  }

  function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    websiteModel
      .findWebsiteById(websiteId)
      .then(function(website) {
        res.json(website);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
      .updateWebsite(websiteId, website)
      .then(function(website) {
        res.json(website);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
      .deleteWebsite(websiteId)
      .then(function (status) {
        res.send(status);
      }, function (err) {
        res.sendStatus(500).send(err);
      });
  }
};