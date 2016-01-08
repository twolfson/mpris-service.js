// Load in our dependencies
var assert = require('assert');
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
  //   `mprisUtils.getProperties(['CanQuit', 'CanRaise']); it(function () { this.CanQuit; });
  //   ^^^ winner
  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanQuit
  it('defaults CanQuit to false', function (done) {
    this.mprisSubscriber.GetCanQuit(function handleGetCanQuit (err, CanQuit) {
      if (err) { return done(err); }
      assert.strictEqual(CanQuit, false);
      done();
    });
  });

  // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanRaise
  it('defaults CanRaise to false', function (done) {
    this.mprisSubscriber.GetCanRaise(function handleGetCanRaise (err, CanRaise) {
      if (err) { return done(err); }
      assert.strictEqual(CanRaise, false);
      done();
    });
  });
});
