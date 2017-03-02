module.exports = function (app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../public/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.get("/api/page/:pageId/widget", findWidgetsByPageId);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.put("/api/page/:pageId/widget", reorderWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
  ];

  var nextId = 0;

  function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget.pageId = pageId;
    widget._id = nextId.toString();
    nextId += 1;
    widgets.push(widget);
    res.json(widget);
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

    widget = findWidgetByIdHelper(widgetId);
    widget.url = '/uploads/'+filename;
    updateWidgetHelper(widgetId, widget);

    res.redirect(callbackUrl);

  }


  function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var pageWidgets = [];
    for(var p in widgets) {
      var widget = widgets[p];
      if( widget.pageId === pageId ) {
        pageWidgets.push(widgets[p]);
      }
    }
    res.json(pageWidgets);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    res.json(findWidgetByIdHelper(widgetId));
  }
  
  function findWidgetByIdHelper(widgetId) {
    console.log(widgets);
    console.log(widgetId);
    for(var p in widgets) {
      if(widgets[p]._id === widgetId) {
        return widgets[p];
      }
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    res.json(updateWidgetHelper(widgetId, widget));
  }
  
  function updateWidgetHelper(widgetId, widget) {
    for(var p in widgets) {
      if(widgets[p]._id === widgetId) {
        widgets[p] = widget;
        return widgets[p];
      }
    }
  }

  function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var startIndex = req.query["initial"];
    var endIndex = req.query["final"];
    widget = widgets[startIndex];
    widgets.splice(startIndex, 1);
    widgets.splice(endIndex, 0, widget);
    res.json(widgets);
  }

  function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var p in widgets) {
      if(widgets[p]._id === widgetId) {
        widgets.splice(p, 1);
        return;
      }
    }
  }

}
