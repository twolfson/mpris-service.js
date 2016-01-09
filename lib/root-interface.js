// Load in our dependencies
var utils = require('./utils');

// TODO: Handle updating parameters via a `.set` method which emits to `org.freedesktop...PropertiesChanged`
//   We don't plan on supporting a dynamically changing `Raise`/`Quit` as that fucks with the logic a lot...
//   Maybe we could do something like a diff but I think it's overkill

// Define our constructor
function RootInterface(params) {
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
  // Define our info and interface
  var rootParams = params.Root;
  this.info = {
    // Methods
    Raise: rootParams.Raise || utils.noop,
    Quit: rootParams.Quit || utils.noop,

    // Properties
    CanQuit: !!rootParams.Quit,
    CanRaise: !!rootParams.Raise,
    // TODO: Conditionally change based on `params.TrackList`?
    HasTrackList: false,
    Identity: rootParams.Identity || params.name,
    SupportedUriSchemes: rootParams.SupportedUriSchemes || [], // Read only
    SupportedMimeTypes: rootParams.SupportedMimeTypes || [] // Read only
  };
  this.interface = {
    name: 'org.mpris.MediaPlayer2',
    methods: {
      Raise: [],
      Quit: []
    },
    properties: {
      CanRaise: 'b',
      CanQuit: 'b',
      Identity: 's'
      // TODO: Come back to this once issue in `dbus-native` is resolved
      //   https://github.com/sidorares/node-dbus/issues/79
      // SupportedUriSchemes: 'as', // Read only
      // SupportedMimeTypes: 'as' // Read only
    }
  };

  // Handle optional parameters
  if (rootParams.Fullscreen !== undefined) {
    this.info.Fullscreen = rootParams.Fullscreen;
    this.info.CanSetFullscreen = true;
    this.interface.properties.Fullscreen = 'b'; // Read/Write (optional)
    this.interface.properties.CanSetFullscreen = 'b'; // Read only (optional)
  }
  if (rootParams.DesktopEntry !== undefined) {
    this.info.DesktopEntry = rootParams.DesktopEntry;
    this.interface.properties.DesktopEntry = 's'; // Read only (optional)
  }
}
RootInterface.exportInterface = function (dbus, params) {
  // Generate a new RootInterface, attach it to dbus, and return the interface
  var rootInterface = new RootInterface(params);
  rootInterface.exportInterface(dbus);
  return rootInterface;
};
RootInterface.prototype = {
  exportInterface: function (dbus) {
    // https://github.com/sidorares/node-dbus/blob/v0.2.0/lib/bus.js#L195
    dbus.exportInterface(this.info, '/org/mpris/MediaPlayer2', this.interface);
  }
};

// Export our constructor
module.exports = RootInterface;
