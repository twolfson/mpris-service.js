// Load in our dependencies
var assert = require('assert');
var _ = require('underscore');
var DBus = require('dbus-native');
var pkg = require('../package.json');
var debug = require('debug')(pkg.name);
var RootInterface = require('./root-interface');

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
    Player: {},
    TrackList: {},
    Playlists: {}
  }, params);

  // Export our interfaces
  // TODO: Actually leverage params
  this.Root = RootInterface.exportInterface(this.dbus, params);
  this._exportPlayerInterface(params);
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

  _exportPlayerInterface: function (playerParams) {
    // Export our MediaPlayer2.Player interface
    // http://specifications.freedesktop.org/mpris-spec/latest/Player_Interface.html
    this.dbus.exportInterface({
      // Methods
      Next: function () {
        console.log('Next called', arguments);
      },
      Previous: function () {
        console.log('Previous called', arguments);
      },
      Pause: function () {
        console.log('Pause called', arguments);
      },
      PlayPause: function () {
        console.log('PlayPause called', arguments);
      },
      Stop: function () {
        console.log('Stop called', arguments);
      },
      Play: function () {
        console.log('Play called', arguments);
      },
      // Seek: function (x: Offset) {
      Seek: function (x) {
        console.log('Seek called', arguments);
      },
      // SetPosition: function (o: TrackId, x: Position) {
      SetPosition: function (o, x) {
        console.log('SetPosition called', arguments);
      },
      // OpenUri: function (s: Uri) {
      OpenUri: function (s) {
        console.log('OpenUri called', arguments);
      },

      // Properties
      // TODO: Document enum
      PlaybackStatus: 'Playing', /* Playback_Status */ // Read only
      // TODO: Document enum
      LoopStatus: 'None', /* Loop_Status */ // Read/Write (optional)
      // TODO: Document allowance for rate varying
      Rate: 1.0, /* Playback_Rate */ // Read/Write
      // TODO: Document shuffle
      Shuffle: true, // Read/Write (optional)
      // TODO: Document metadata
      Metadata: {'mpris:length': 2000}, /* Metadata_Map */ // Read only
      // TODO: Need to make sure >= 0 on set
      Volume: 10.0, /* Volume */ // Read/Write
      // TODO: Figure out `position`
      Position: 1000, /* Time_In_Us */ // Read only
      MinimumRate: 1.0, /* Playback_Rate */ // Read only
      MaximumRate: 1.0, /* Playback_Rate */ // Read only
      CanGoNext: true, // Read only
      CanGoPrevious: true, // Read only
      CanPlay: true, // Read only
      CanPause: true, // Read only
      CanSeek: true, // Read only
      CanControl: true // Read only
    }, '/org/mpris/MediaPlayer2', {
      name: 'org.mpris.MediaPlayer2.Player',
      methods: {
        // jscs:disable disallowSpacesInsideArrayBrackets
        Next: [],
        Previous: [],
        Pause: [],
        PlayPause: [],
        Stop: [],
        Play: [],
        Seek: ['x' /* Offset */],
        SetPosition: ['o' /* TrackId */, 'x' /* Position */],
        OpenUri: ['s' /* Uri */]
        // jscs:enable disallowSpacesInsideArrayBrackets
      },
      signals: {
        // jscs:disable disallowSpacesInsideArrayBrackets
        // TODO: Register handler for event
        Seeked: ['x' /* Position */]
        // jscs:enable disallowSpacesInsideArrayBrackets
      },
      properties: {
        PlaybackStatus: 's', /* Playback_Status */ // Read only
        LoopStatus: 's', /* Loop_Status */ // Read/Write (optional)
        // TODO: Handle writes -- via `org.freedesktop.DBus.Properties.PropertiesChanged`
        //   but that might be for reads actually... =/
        //   http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:SupportedUriSchemes
        // http://specifications.freedesktop.org/mpris-spec/latest/Player_Interface.html#Property:Rate
        Rate: 'd', /* Playback_Rate */ // Read/Write
        Shuffle: 'b', // Read/Write (optional)
        // Metadata: 'a{sv}', /* Metadata_Map */ // Read only
        Volume: 'd', /* Volume */ // Read/Write
        Position: 'x', /* Time_In_Us */ // Read only
        MinimumRate: 'd', /* Playback_Rate */ // Read only
        MaximumRate: 'd', /* Playback_Rate */ // Read only
        CanGoNext: 'b', // Read only
        CanGoPrevious: 'b', // Read only
        CanPlay: 'b', // Read only
        CanPause: 'b', // Read only
        CanSeek: 'b', // Read only
        CanControl: 'b' // Read only
      }
    });
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
