const { Categ } = require('./categ.class');
const createModel = require('../../models/categ.model');
const hooks = require('./categ.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/categ', new Categ(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('categ');

  service.hooks(hooks);
};