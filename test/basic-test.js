// Load in our dependencies
var expect = require('chai').expect;
var mprisUtils = require('./utils/mpris');

// Start our tests
describe('An MPRIS service', function () {
  mprisUtils.init({name: 'basic-connect'});

  it('can be accessed by an MPRIS client', function () {
    // DEV: We would have errored out on `connect`
    expect(this.mprisSubscriber).to.not.equal(undefined);
  });

  it('lists introspectable interfaces', function () {
    // Verify methods and property methods are accessible
    expect(this.mprisSubscriber.Player).to.have.property('Next');
    expect(this.mprisSubscriber.Player).to.have.property('GetCanGoNext');
  });
});
