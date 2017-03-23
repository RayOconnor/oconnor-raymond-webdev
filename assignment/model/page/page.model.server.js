module.exports = function () {

  var api = {
    createPageForWebsite: createPageForWebsite,
    findPageById: findPageById,
    findAllPagesForWebsite: findAllPagesForWebsite,
    updatePage: updatePage,
    deletePage: deletePage,
    addWidgetToPage: addWidgetToPage,
    reorderWidget: reorderWidget
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var pageSchema = require('./page.schema.server')();
  var pageModel = mongoose.model('pageModel', pageSchema);

  return api;

  function createPageForWebsite(websiteId, page) {
    var d = q.defer();
    page._website = websiteId;
    pageModel.create(page, function (err, page) {
      if (err) {
        d.reject(err);
      } else {
        d.resolve(page);
      }
    });
    return d.promise;
  }

  function findPageById(pageId) {
    var d = q.defer();

    pageModel
      .findById(pageId, function (err, page) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(page);
        }
      });

    return d.promise;
  }

  function addWidgetToPage(widget) {
    var d = q.defer();

    pageModel
      .findById(widget._page, function (err, page) {
        if(err) {
          d.reject(err);
        } else {
          page.widgets.push(widget._id);
          page.markModified('widgets');
          page.save();
          d.resolve(widget);
        }
      });

    return d.promise;
  }

  function findAllPagesForWebsite(websiteId) {
    var d = q.defer();

    pageModel
      .find({_website: websiteId}, function (err, pages) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(pages);
        }
      });

    return d.promise;

  }

  function updatePage(pageId, page) {
    var d = q.defer();

    pageModel
      .findOneAndUpdate({'_id': pageId}, page, function (err, page) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(page);
        }
      });

    return d.promise;
  }

  function deletePage(pageId) {
    var d = q.defer();

    pageModel
      .remove({'_id': pageId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }

  function reorderWidget(pageId, startIndex, endIndex) {
    var deferred = q.defer();
    pageModel
      .findById(pageId, function (err, page) {
        widget = page.widgets[startIndex];
        page.widgets.splice(startIndex, 1);
        page.widgets.splice(endIndex, 0, widget);
        page.save();
        deferred.resolve(page);
      });
    return deferred.promise;
  }
};