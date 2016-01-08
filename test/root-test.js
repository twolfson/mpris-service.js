// Load in our dependencies
var expect = require('chai').expect;
var mprisUtils = require('./utils/mpris');

// Start our tests
// http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
describe('A default MPRIS Root interface', function () {
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

  // TODO: Figure out what to do for `HasTrackList`
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:HasTrackList

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:Identity
  mprisUtils.getRootProperties(['Identity', 'SupportedUriSchemes', 'SupportedMimeTypes']);
  it('defaults our service identity to the dbus name', function () {
    // TODO: Complete me
  });

  it('has no supported URI schemes', function () {
    // TODO: Complete me
  });

  it('has no supported mime-types', function () {
    // TODO: Complete me
  });
});
