function exportRootInterface(dbus, params) {
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
  // https://github.com/sidorares/node-dbus/blob/v0.2.0/lib/bus.js#L195
  var rootParams = params;
  dbus.exportInterface({
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
  }, '/org/mpris/MediaPlayer2', {
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
  });
}
module.exports = exportRootInterface;
