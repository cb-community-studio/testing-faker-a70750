const assert = require('assert');
const app = require('../../src/app');

describe('\'rels\' service', () => {
  it('registered the service', () => {
    const service = app.service('rels');

    assert.ok(service, 'Registered the service (rels)');
  });
});
