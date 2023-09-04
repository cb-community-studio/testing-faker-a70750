const assert = require('assert');
const app = require('../../src/app');

describe('\'categ\' service', () => {
  it('registered the service', () => {
    const service = app.service('categ');

    assert.ok(service, 'Registered the service (categ)');
  });
});
