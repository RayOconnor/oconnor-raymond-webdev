module.exports = function (app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findWebsitesByUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
  ];
  var nextId = 0;
  
  function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    website.developerId = userId;
    website._id = nextId.toString();
    nextId += 1;
    websites.push(website)
    res.json(website);
  }

  function findWebsitesByUser(req, res) {
    var userId = req.params.userId;
    
    var userWebsites = [];
    for(var w in websites) {
      var website = websites[w];
      if( website.developerId === userId ) {
        userWebsites.push(websites[w]);
      }
    }
    res.json(userWebsites);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    
    for(var w in websites) {
      if(websites[w]._id === websiteId) {
        res.json(websites[w]);
        return;
      }
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    
    for(var w in websites) {
      if(websites[w]._id === websiteId) {
        websites[w] = website;
        res.json(websites[w]);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    for(var w in websites) {
      if(websites[w]._id === websiteId) {
        websites.splice(w, 1);
        return;
      }
    }
  }
};