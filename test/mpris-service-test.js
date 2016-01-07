// Load in dependencies
var assert = require('assert');
var mprisService = require('../');

// Start our tests
describe('mpris-service', function () {
  it('returns awesome', function () {
    assert.strictEqual(mprisService(), 'awesome');
  });
});
