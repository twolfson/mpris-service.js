// Load in our dependencies
var assert = require('assert');
var _ = require('underscore');
var DBus = require('dbus-native');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);
var RootInterface = require('./root-interface');
var PlayerInterface = require('./player-interface');

// TODO: Define constants for response codes and types
// TODO: Base `CanQuit` and `CanRaise` booleans off of parameters
// TODO: Dynamically create interface docs. We shouldn't need to be this verbose
// TODO: Maybe we should change our `createService` signature to something more like `http`
//   where we would init and then start a register name
//   and emit `error` and `code` when we get them (a la `error` and `response` events)
// TODO: Consider breaking out each of the interfaces (e.g. `Root`, `Player`) into their own classes
//   when are then properties of `MprisService`

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

  // Fallback nested parameters
  params = _.extend({
    Root: {},
    Player: {}
  }, params);

  // Export our interfaces
  this.Root = RootInterface.exportInterface(this.dbus, params);
  this.Player = PlayerInterface.exportInterface(this.dbus, params);
  // TODO: Make `TrackList` and `Playlists` optional
  // http://specifications.freedesktop.org/mpris-spec/latest/index.html#Entry-point
  this._exportTrackListInterface(params);
  this._exportPlaylistsInterface(params);
}
MprisService.createService = function (params, cb) {
  // Assert we received `name`
  assert(params.name, 'Expected `params.name` to be defined but it was not. ' +
    'Please specify a name for our MPRIS service');

  // Create a new service
  var mprisService = new MprisService(params);

  // Request our name
  // TODO: Document me
  var requestNameFlag = params.requestNameFlag || 0;
  mprisService.requestName(params.name, requestNameFlag, function handleResponse (err, code) {
    console.log('name received', err, code);
    // Callback with error, code, and our service
    cb(err, code, mprisService);
  });
};
MprisService.prototype = {
  requestName: function (name, flag, cb) {
    var serviceName = 'org.mpris.MediaPlayer2.' + name;
    debug('Requesting name "' + name + '" "' + flag + '"');
    this.dbus.requestName(serviceName, flag, cb);
  },
  _exportTrackListInterface: function (trackListParams) {
    // Export our MediaPlayer2.TrackList interface
    // http://specifications.freedesktop.org/mpris-spec/latest/Track_List_Interface.html
    this.dbus.exportInterface({
      // TODO: Implement me
    }, '/org/mpris/MediaPlayer2', {
      name: 'org.mpris.MediaPlayer2.TrackList'
      // TODO: Implement me
    });
  },
  _exportPlaylistsInterface: function (playlistsParams) {
    // Export our MediaPlayer2.Playlists interface
    // http://specifications.freedesktop.org/mpris-spec/latest/Playlists_Interface.html
    this.dbus.exportInterface({
      // TODO: Implement me
    }, '/org/mpris/MediaPlayer2', {
      name: 'org.mpris.MediaPlayer2.Playlists'
      // TODO: Implement me
    });
  }
};

// Export our constructor
module.exports = MprisService;
