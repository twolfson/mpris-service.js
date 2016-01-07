// Load in our dependencies
var DBus = require('dbus-native');

/**
 * Constructor for a new MPRIS player
 * @param {Object} params Container for parameters
 * @param {String} params.name Name for the MPRIS service
 *    This should be somehting like `abc`.
 *    It will be concatenated into the full service string "org.mpris.MediaPlayer2.abc"
 */
function MprisService(params) {
  // Create a DBus based service
  // https://github.com/sidorares/node-dbus/blob/v0.2.0/index.js#L134-L145
  this.dbus = DBus.sessionBus();

  // Export our interfaces
  // TODO: Actually leverage params
}

/**
// TODO: Base `CanQuit` and `CanRaise` booleans off of parameters
  TODO: Continue docs...
 * @param {Function} cb Optional error-first callback handler
 *    Signature should match `(err, code, mprisService)`
 *    Code will be response code from `dbus`
 *    // TODO: Mention possible code responses
 *    mprisService TODO: Document me
 */
MprisService.createService = function (params, cb) {
  // Assert we received `name`
  assert(params.name, 'Expected `params.name` to be defined but it was not. ' +
    'Please specify a name for our MPRIS service');

  // Create a new service
  var mprisService = new MprisService(params);

  // Request our name
  mprisService._requestName(params.name, function handleResponse (err, code) {
    // Callback with error, code, and our service
    cb(err, code, mprisService);
  });
};

// Export our constructor
module.exports = MprisService;
