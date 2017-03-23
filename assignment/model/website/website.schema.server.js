module.exports = function () {
  var mongoose = require('mongoose');

  var WebsiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
    dateCreated: {type: Date}
  }, {collection: 'website'});

  return WebsiteSchema;
};