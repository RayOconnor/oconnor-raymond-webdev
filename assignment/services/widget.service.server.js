module.exports = function (app, widgetModel, pageModel) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../public/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.get("/api/page/:pageId/widget", findWidgetsByPageId);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.put("/api/page/:pageId/widget", reorderWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  
  function createWidget(req, res) {
    var pageId = req.params.pageId;
    var newWidget = req.body;
    widgetModel
      .createWidgetForPage(pageId, newWidget)
      .then(function(widget) {
        return pageModel.addWidgetToPage(widget)
      })
      .then(function(widget) {
        res.json(widget.toObject())
      });
  }

  function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var callbackUrl   = req.body.callbackUrl;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    
    saveWidgetUrl(widgetId, '/uploads/'+filename);

    res.redirect(callbackUrl);

  }
  
  function saveWidgetUrl(widgetId, url) {
    widgetModel.saveWidgetUrl(widgetId, url);
  }
  
  function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function(widgets) {
        res.json(widgets);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
      .findWidgetById(widgetId)
      .then(function(widget) {
        res.json(widget);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
      .updateWidget(widgetId, widget)
      .then(function(widget) {
        res.json(widget);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var startIndex = req.query["initial"];
    var endIndex = req.query["final"];
    pageModel
      .reorderWidget(pageId, startIndex, endIndex)
      .then(function(page) {
        res.json(page);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
      .deleteWidget(widgetId)
      .then(function (status) {
        res.send(status);
      }, function (err) {
        res.sendStatus(500).send(err);
      });
  }

};
