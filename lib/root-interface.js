function RootInterface(params) {
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
  // Define our info and interface
  var rootParams = params.Root;
  this.info = {
    // Methods
    Raise: function () {
      console.log('Raise called', arguments);
    },
    Quit: function () {
      console.log('Quit called', arguments);
    },

    // Properties
    // TODO: Base `CanRaise`/`CanQuit` off of `Raise`/`Quit` being passed
    // TODO: Sort our `Fullscreen`, `CanSetFullscreen`, `HasTrackList`, and `DesktopEntry`
    CanRaise: false,
    CanQuit: false,
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
      // TODO: Complete me
      CanRaise: 'b',
      CanQuit: 'b',
      Identity: 's'
      // TODO: Come back to this once issue in `dbus-native` is resolved
      //   https://github.com/sidorares/node-dbus/issues/79
      // SupportedUriSchemes: 'as', // Read only
      // SupportedMimeTypes: 'as' // Read only
    }
  };
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
module.exports = RootInterface;
