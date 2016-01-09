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

describe.skip('An fullscreen friendly root interface', function () {
  it('lists our current Fullscreen status', function () {

  });

  it('lists CanSetFullscreen as true', function () {

  });

  describe('being updated by a client', function () {
    it('updates the Fullscreen status', function () {

    });

    it.skip('emits change event for Fullscreen', function () {

    });
  });
});

describe.skip('A root interface with a track list', function () {
  it('lists HasTrackList as true', function () {

  });
});

describe.skip('A root interface with a desktop entry', function () {
  it('lists our DesktopEntry', function () {

  });
});
