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
      // TODO: Figure out how to get context for Raise
      //   Probably make an `_init` but that's not too reusable
      // TODO: Don't forget to cleanup
      Raise: function () {
        that.raiseCalled = true;
      },
      Quit: function () {
        that.quitCalled = true;
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

  // TODO: Test me
  describe.skip('when Raise is called', function () {
    it('calls our Raise method', function () {

    });
  });

  describe.skip('when Quit is called', function () {
    it('calls our Quit method', function () {

    });
  });
});

describe('A fullscreen friendly root interface being updated by a client', function () {
  mprisUtils.init({
    name: 'root-fullscreen',
    Root: {
      Fullscreen: true
    }
  });

  it.skip('updates the Fullscreen status', function () {

  });

  it.skip('emits change event for Fullscreen', function () {

  });
});
