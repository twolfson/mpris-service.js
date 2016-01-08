function exportRootInterface(dbus, params) {
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
  // https://github.com/sidorares/node-dbus/blob/v0.2.0/lib/bus.js#L195
  dbus.exportInterface({
    // Methods
    Raise: function () {
      console.log('Raise called', arguments);
    },
    Quit: function () {
      console.log('Quit called', arguments);
    },

    // Properties
    CanRaise: false,
    CanQuit: false
  }, '/org/mpris/MediaPlayer2', {
    name: 'org.mpris.MediaPlayer2',
    methods: {
      Raise: [],
      Quit: []
    },
    properties: {
      // TODO: Complete me
      CanRaise: 'b',
      CanQuit: 'b'
    }
  });
}
module.exports = exportRootInterface;
