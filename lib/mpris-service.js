// Load in our dependencies
var DBus = require('dbus-native');

/**
 * Constructor for a new MPRIS player
 * @param {Object} params Container for parameters
 * @param {String} params.name Name for the MPRIS service
 *    This should be somehting like `abc`.
 *    It will be concatenated into the full service string "org.mpris.MediaPlayer2.abc"
 * @param {Function} cb Optional error-first callback handler
 *    Signature should match `(err, code, interface)`
 *    Code will be response code from `dbus`
 *    // TODO: Mention code parameters
 *    Interface
 */
function MprisService(params, cb) {
  return 'awesome';
}
MprisService.get

// Export our function
module.exports = MprisService;
