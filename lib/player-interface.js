// Load in our dependencies
var utils = require('./utils');

// TODO: Handle updating parameters via a `.set` method which emits to `org.freedesktop...PropertiesChanged`
//   We don't plan on supporting a dynamically changing `Raise`/`Quit` as that fucks with the logic a lot...
//   Maybe we could do something like a diff but I think it's overkill

// Define our constructor
function PlayerInterface(params) {
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
  // Define our info and interface
  var playerParams = params.Player;
  this.info = {
    // Methods
    Next: playerParams.Next || utils.noop,
    Previous: playerParams.Previous || utils.noop,
    Pause: playerParams.Pause || utils.noop,
    PlayPause: playerParams.PlayPause || utils.noop,
    Stop: playerParams.Stop || utils.noop,
    Play: playerParams.Play || utils.noop,
    Seek: playerParams.Seek || utils.noop,
    SetPosition: playerParams.SetPosition || utils.noop,
    OpenUri: playerParams.OpenUri || utils.noop,

    // TODO: Handle signals
    // Properties
    // TODO: Handle properties
    // TODO: Document enum
    PlaybackStatus: 'Playing', // Playback_Status, Read only
    // TODO: Document enum
    LoopStatus: 'None', // Loop_Status, Read/Write (optional)
    // TODO: Document allowance for rate varying
    Rate: 1.0, // Playback_Rate, Read/Write
    // TODO: Document shuffle
    Shuffle: true, // Read/Write (optional)
    // TODO: Document metadata
    Metadata: [{'mpris:length': 2000}], // Metadata_Map, Read only
    // TODO: Need to make sure >= 0 on set
    Volume: 10.0, // Volume, Read/Write
    // TODO: Figure out `position`
    Position: 1000, // Time_In_Us, Read only
    MinimumRate: 1.0, // Playback_Rate, Read only
    MaximumRate: 1.0, // Playback_Rate, Read only
    CanGoNext: true, // Read only
    CanGoPrevious: true, // Read only
    CanPlay: true, // Read only
    CanPause: true, // Read only
    CanSeek: true, // Read only
    CanControl: true // Read only
  };
  this.interface = {
    name: 'org.mpris.MediaPlayer2.Player',
    methods: {
      Next: [],
      Previous: [],
      Pause: [],
      PlayPause: [],
      Stop: [],
      Play: [],
      // jscs:disable disallowSpacesInsideArrayBrackets
      Seek: ['x' /* Offset */],
      SetPosition: ['o' /* TrackId */, 'x' /* Position */],
      OpenUri: ['s' /* Uri */]
      // jscs:enable disallowSpacesInsideArrayBrackets
    },
    // TODO: Handle signals
    // TODO: Handle properties
    properties: {
      PlaybackStatus: 's',
      LoopStatus: 's',
      Rate: 'd',
      Shuffle: 'b',
      Metadata: 'a{sv}',
      Volume: 'd',
      Position: 'x',
      MinimumRate: 'd',
      MaximumRate: 'd',
      CanGoNext: 'b',
      CanGoPrevious: 'b',
      CanPlay: 'b',
      CanPause: 'b',
      CanSeek: 'b',
      CanControl: 'b'
    }
  };
}
PlayerInterface.exportInterface = function (dbus, params) {
  // Generate a new PlayerInterface, attach it to dbus, and return the interface
  var playerInterface = new PlayerInterface(params);
  playerInterface.exportInterface(dbus);
  return playerInterface;
};
PlayerInterface.prototype = {
  exportInterface: function (dbus) {
    // https://github.com/sidorares/node-dbus/blob/v0.2.0/lib/bus.js#L195
    dbus.exportInterface(this.info, '/org/mpris/MediaPlayer2', this.interface);
  }
};

// Export our constructor
module.exports = PlayerInterface;
