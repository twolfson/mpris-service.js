// Load in our dependencies
var assert = require('assert');
var mprisUtils = require('./utils/mpris');

// Start our tests
// http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
describe('A default MPRIS Root interface', function () {
  mprisUtils.init({name: 'root-default'});

  it('defaults noop properties to false', function () {
    // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanQuit
    // http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html#Property:CanRaise
    assert.strictEqual(this.mprisSubscriber.CanQuit, false);
    assert.strictEqual(this.mprisSubscriber.CanRaise, false);
  });
});
