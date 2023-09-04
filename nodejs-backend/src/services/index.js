const users = require("./users/users.service.js");
const rels = require("./rels/rels.service.js");
const categ = require("./categ/categ.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(rels);
  app.configure(categ);
  // ~cb-add-configure-service-name~
};
