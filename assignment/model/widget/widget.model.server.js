
module.exports = function () {

  var api = {
    createWidgetForPage: createWidgetForPage,
    findWidgetById: findWidgetById,
    findAllWidgetsForPage: findAllWidgetsForPage,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var widgetSchema = require('./widget.schema.server')();
  var widgetModel = mongoose.model('widgetModel', widgetSchema);

  return api;

  function createWidgetForPage(pageId, widget) {
    var d = q.defer();
    widget._page = pageId;
    widgetModel.create(widget, function (err, widget) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve(widget);
      }
    });
    return d.promise;
  }

  function findWidgetById(widgetId) {
    var d = q.defer();

    widgetModel
      .findById(widgetId, function (err, widget) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(widget);
        }
      });

    return d.promise;
  }

  function findAllWidgetsForPage(pageId) {
    var d = q.defer();

    widgetModel
      .find({_page: pageId}, function (err, widgets) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(widgets);
        }
      });

    return d.promise;

  }

  function updateWidget(widgetId, widget) {
    var d = q.defer();

    widgetModel
      .findOneAndUpdate({'_id': widgetId}, widget, function (err, widget) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(widget);
        }
      });

    return d.promise;
  }

  function deleteWidget(widgetId) {
    var d = q.defer();

    widgetModel
      .remove({'_id': widgetId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }
};