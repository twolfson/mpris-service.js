// Load in our dependencies
var expect = require('chai').expect;
var mprisUtils = require('./utils/mpris');

// Start our tests
// http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
describe('A default MPRIS root interface', function () {
  mprisUtils.init({name: 'root-default'});
  mprisUtils.getRootProperties(['CanQuit', 'CanRaise']);

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanQuit
  it('defaults CanQuit to false', function () {
    expect(this.CanQuit).to.equal(false);
  });

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanRaise
  it('defaults CanRaise to false', function () {
    expect(this.CanRaise).to.equal(false);
  });

  it('does not have optional properties', function () {
    expect(this.mprisSubscriber).to.not.have.property('Fullscreen');
    expect(this.mprisSubscriber).to.not.have.property('CanSetFullscreen');
    expect(this.mprisSubscriber).to.not.have.property('DesktopEntry');
  });

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:HasTrackList
  mprisUtils.getRootProperties(['HasTrackList']);
  it('has lists HasTrackList as false', function () {
    expect(this.HasTrackList).to.equal(false);
  });

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:Identity
  mprisUtils.getRootProperties(['Identity']);
  it('defaults our service identity to the dbus name', function () {
    expect(this.Identity).to.equal('mpris-service-test-root-default');
  });

  // TODO: Re-enable these tests
  // DEV: We can enable on Travis CI since issue is being caused by `MPRIS` using `GetAll`
  //   https://github.com/sidorares/node-dbus/issues/102
  // mprisUtils.getRootProperties(['SupportedUriSchemes', 'SupportedMimeTypes']);
  it.skip('has no supported URI schemes', function () {
    expect(this.SupportedUriSchemes).to.deep.equal([]);
  });

  it.skip('has no supported mime-types', function () {
    expect(this.SupportedMimeTypes).to.deep.equal([]);
  });
});

describe('A root interface with everything set', function () {
  mprisUtils.init({
    name: 'root-set-everything',
    Root: {
      // Methods
      Raise: function () {
        this._raiseCalled = true;
      },
      Quit: function () {
        this._quitCalled = true;
      },

      // Properties
      Identity: 'hello-world',
      SupportedUriSchemes: ['file', 'http'],
      SupportedMimeTypes: ['audio/mpeg'],

      // Optional properties
      Fullscreen: true,
      DesktopEntry: '/usr/share/applications/python2.7.desktop'
    },
    TrackList: {}
  });

  mprisUtils.getRootProperties(['CanRaise', 'CanQuit']);
  it('has CanRaise set to true', function () {
    expect(this.CanRaise).to.equal(true);
  });

  it('has CanQuit set to true', function () {
    expect(this.CanQuit).to.equal(true);
  });

  mprisUtils.getRootProperties(['Fullscreen', 'CanSetFullscreen']);
  it('lists our Fullscreen status', function () {
    expect(this.Fullscreen).to.equal(true);
  });

  it('lists CanSetFullscreen as true', function () {
    expect(this.CanSetFullscreen).to.equal(true);
  });

  mprisUtils.getRootProperties(['HasTrackList', 'DesktopEntry']);
  it('lists HasTrackList as true', function () {
    expect(this.HasTrackList).to.equal(true);
  });

  it('lists our DesktopEntry', function () {
    expect(this.DesktopEntry).to.equal('/usr/share/applications/python2.7.desktop');
  });

  describe('when Raise is called', function () {
    before(function callRaise (done) {
      this.mprisSubscriber.Raise(done);
    });

    it('calls our Raise method', function () {
      expect(this.mprisService.Root.info).to.have.property('_raiseCalled', true);
    });
  });

  describe('when Quit is called', function () {
    before(function callQuit (done) {
      this.mprisSubscriber.Quit(done);
    });

    it('calls our Quit method', function () {
      expect(this.mprisService.Root.info).to.have.property('_quitCalled', true);
    });
  });
});

// TODO: Figure out what to do here since `dbus-native` currently doesn't support this -_-;;
//   https://github.com/sidorares/node-dbus/blob/v0.2.0/lib/stdifaces.js#L118
describe.skip('A fullscreen friendly root interface being updated by a client', function () {
  mprisUtils.init({
    name: 'root-fullscreen',
    Root: {
      Fullscreen: true
    }
  });
  before(function updateFullscreen (done) {
    this.mprisSubscriber.SetFullscreen(false, done);
  });

  mprisUtils.getRootProperties(['Fullscreen']);
  it('updates the Fullscreen status', function () {
    expect(this.Fullscreen).to.equal(false);
  });

  it.skip('emits change event for Fullscreen', function () {
    // TODO: Listen to `on('change', function (property, value) {})`
    //   or maybe `on('Set', ...` for semantics
  });
});
