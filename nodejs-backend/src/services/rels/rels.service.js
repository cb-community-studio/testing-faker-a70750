const { Rels } = require('./rels.class');
const createModel = require('../../models/rels.model');
const hooks = require('./rels.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/rels', new Rels(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rels');

  service.hooks(hooks);
};