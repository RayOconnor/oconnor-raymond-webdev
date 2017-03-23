module.exports = function (app, pageModel, websiteModel) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findPagesByWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage)
  
  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var newPage = req.body;
    pageModel
      .createPageForWebsite(websiteId, newPage)
      .then(function(page) {
        return websiteModel.addPageToWebsite(page)
      })
      .then(function(page) {
        res.json(page.toObject())
      });

  }

  function findPagesByWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function(pages) {
        res.json(pages);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
      .findPageById(pageId)
      .then(function(page) {
        res.json(page);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
      .updatePage(pageId, page)
      .then(function(page) {
        res.json(page);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
      .deletePage(pageId)
      .then(function (status) {
        res.send(status);
      }, function (err) {
        res.sendStatus(500).send(err);
      });
    }
  
};
