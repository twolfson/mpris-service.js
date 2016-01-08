// Load in our dependencies
var assert = require('assert');
var mprisUtils = require('./utils/mpris');

// Start our tests
describe('An MPRIS service', function () {
  mprisUtils.init({name: 'basic-connect'});

  it('can be accessed by an MPRIS client', function () {
    // DEV: We would have errored out on `connect`
    assert(this.mprisSubscriber);
  });

  it('lists introspectable interfaces', function () {
    // Verify methods and property methods are accessible
    assert(this.mprisSubscriber.Player.Next);
    assert(this.mprisSubscriber.Player.GetCanGoNext);
  });
});
