module.exports = function (app) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage)
  
  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
  ];

  var nextId = 0;

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page.websiteId = websiteId;
    page._id = nextId.toString();
    nextId += 1;
    pages.push(page);
    res.json(page);
  }

  function findPagesByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var websitePages = [];
    for(var p in pages) {
      var page = pages[p];
      if( page.websiteId === websiteId ) {
        websitePages.push(pages[p]);
      }
    }
    res.json(websitePages);
  }

  function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
      if(pages[p]._id === pageId) {
        res.json(pages[p]);
        return;
      }
    }
  }

  function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var p in pages) {
      if(pages[p]._id === pageId) {
        pages[p] = page;
        res.json(pages[p]);
        return;
      }
    }
    
  }

  function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages) {
      if(pages[p]._id === pageId) {
        pages.splice(p, 1);
        return;
      }
    }
  }
  
}
