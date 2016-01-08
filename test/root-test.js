// Load in our dependencies
var expect = require('chai').expect;
var mprisUtils = require('./utils/mpris');

// Start our tests
// http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
describe('A default MPRIS Root interface', function () {
  mprisUtils.init({name: 'root-default'});

  // TODO: Break down into utilities for simpler asserts -- it's going to get a lot more complex
  //   Initial thoughts
  //   `it('defaults CanQuit to false', mprisUtils.getProperty('CanQuit', function (CanQuit) {})`
  //   `mprisUtils.assertProperty('CanQuit', false);` in place of `it`
  //   `describe('CanQuit', function () { mprisUtils.getProperty('CanQuit'); it('defaults CanQuit')`
  //   `mprisUtils.getRootProperties(['CanQuit', 'CanRaise']); it(function () { this.CanQuit; });
  //   ^^^ winner
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanQuit
  it('defaults CanQuit to false', function (done) {
    this.mprisSubscriber.GetCanQuit(function handleGetCanQuit (err, CanQuit) {
      if (err) { return done(err); }
      expect(CanQuit).to.equal(false);
      done();
    });
  });

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanRaise
  it('defaults CanRaise to false', function (done) {
    this.mprisSubscriber.GetCanRaise(function handleGetCanRaise (err, CanRaise) {
      if (err) { return done(err); }
      expect(CanRaise).to.equal(false);
      done();
    });
  });

  it('does not have optional properties', function () {
    expect(this.mprisSubscriber).to.not.have.property('Fullscreen');
    expect(this.mprisSubscriber).to.not.have.property('CanSetFullscreen');
    expect(this.mprisSubscriber).to.not.have.property('DesktopEntry');
  });

  // TODO: Figure out what to do for `HasTrackList`
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:HasTrackList

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:Identity
  it('has our service identity', function () {
    // TODO: Complete me
  });

  it('has no supported URI schemes', function () {
    // TODO: Complete me
  });

  it('has no supported mime-types', function () {
    // TODO: Complete me
  });
});
