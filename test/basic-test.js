// Load in our dependencies
var assert = require('assert');
var _ = require('underscore');
var mprisSubscriber = require('mpris');
var MprisService = require('../');

// Define common utilities
var mprisUtils = {
  init: function (params) {
    // Verify we have a name
    assert(params.name, '`mprisUtils.init` expected to receive "params.name" but it did not. ' +
      'Please provide a name for the MPRIS service (e.g. "basic-connect")');

    // Prepend our name for the test
    params = _.defaults({
      name: 'mpris-service-test-' + params.name
    }, params);

    // Start our connections
    mprisUtils._init(params);
    mprisUtils._connect(params.name);
  },
  _init: function (params) {
    before(function _initFn (done) {
      // Create our service
      var that = this;
      MprisService.createService(params, function handleCreateService (err, code, mprisService) {
        // If there was an error, callback with it
        if (err) {
          return done(err);
        }

        // TODO: Decide what to do with non-primary owner codes
        // TODO: Can we register an interface despite being inactive?
        //   If so, maybe we should callback with the code
        // If the code isn't 1 (i.e. we aren't the primary owner), then callback with an error
        if (code !== 1) {
          return done(new Error('Expected `requestName` response code to be "1" but it was "' + code + '"'));
        }

        // Otherwise, save our service
        that.mprisService = mprisService;
      });
    });
    after(function cleanup () {
      // TODO: Handle unregister
      delete this.mprisService;
    });
  },
  _connect: function (name) {
    before(function _connectFn (done) {
      // Verify we are the only subscriber
      assert.strictEqual(this.mprisSubscriber, undefined,
        '`mprisUtils._connect` called while another connection is already in progress. ' +
        'Please don\'t connect to multiple MPRIS services at the same time');

      // Save our subscriber and connect
      // https://github.com/JumpLink/node-mpris/blob/v0.0.2/example/play.js
      // https://github.com/JumpLink/node-mpris/blob/v0.0.2/mpris.js#L365
      this.mprisSubscriber = mprisSubscriber;
      mprisSubscriber.connect(name, done);
    });
    after(function cleanup () {
      delete this.mprisSubscriber;
    });
  }
};


// Start our tests
describe('An MPRIS service', function () {
  mprisUtils.init({name: 'basic-connect'});

  it('can be accessed by an MPRIS client', function () {
    // DEV: We would have errored out on `connect`
    assert(this.mprisSubscriber);
  });

  it.skip('lists introspectable interfaces', function () {

  });
});
