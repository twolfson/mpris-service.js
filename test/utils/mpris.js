// Load in our dependencies
var assert = require('assert');
var _ = require('underscore');
var async = require('async');
var mprisSubscriber = require('mpris');
var MprisService = require('../../');

// Define initialization utilities
exports.init = function (params) {
  // Verify we have a name
  assert(params.name, '`mprisUtils.init` expected to receive "params.name" but it did not. ' +
    'Please provide a name for the MPRIS service (e.g. "basic-connect")');

  // Prepend our name for the test
  params = _.defaults({
    name: 'mpris-service-test-' + params.name
  }, params);

  // Start our connections
  exports._init(params);
  exports._connect(params.name);
};
exports._init = function (params) {
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
      done();
    });
  });
  after(function cleanup () {
    // TODO: Handle unregister
    delete this.mprisService;
  });
};
exports._connect = function (name) {
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
};

// Define property utilities
exports._getProperties = function (obj, properties, callback) {
  var that = this;
  async.each(properties, function _getPropertyFn (property, cb) {
    // Resolve the method for our property (e.g. `CanQuit` -> `GetCanQuit`)
    var method = 'Get' + property;
    assert(obj[method], 'Expected `obj[' + property + ']` to be defined but it was not.');
    obj[method](function handleGet (err, result) {
      // Save the result and callback
      that[property] = result;
      cb(err);
    });
  }, callback);
};
exports.cleanupProperties = function (properties) {
  after(function cleanupPropertiesFn () {
    var that = this;
    properties.forEach(function cleanupProperty (property) {
      delete that[property];
    });
  });
};
exports.getRootProperties = function (properties) {
  before(function getRootPropertiesFn (done) {
    // Verify we have our subscriber
    assert.notEqual(this.mprisSubscriber, undefined,
      '`mprisUtils.getRootProperties` expected `this.mprisSubscriber` to be defined but it was not.' +
      'Please run `mprisUtils.init` before calling `getRootProperties`');

    // Retrieve and save our properties
    exports._getProperties.call(this, this.mprisSubscriber, properties, done);
  });
  exports.cleanupProperties(properties);
};
