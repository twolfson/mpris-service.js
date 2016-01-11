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
    OpenUri: playerParams.OpenUri || utils.noop

    // TODO: Handle signals
    // TODO: Handle properties
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
