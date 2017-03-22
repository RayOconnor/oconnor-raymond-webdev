module.exports = function (app) {
  var userModel = require('./models/actor.model.server')();
  var model = {
    userModel: userModel
  };

  require("./services/user.service.server.js")(app, userModel);
  require("./services/page.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
}
console.log("hello from the server")
