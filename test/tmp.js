// Load in our dependencies
var mprisSubscriber = require('mpris');
var MprisService = require('../');

// Define our constants
var MPRIS_NAME = 'MprisTest';

// Create our MPRIS service
MprisService.createService({
  name: MPRIS_NAME
}, function handleCreateService (err, code, mprisService) {
  // If there was an error, throw it
  if (err) {
    throw err;
  }

  // TODO: Decide what to do with non-primary owner codes
  // TODO: Can we register an interface despite being inactive?
  //   If so, maybe we should callback with the code
  // If the code isn't 1 (i.e. we aren't the primary owner), then throw an error
  if (code !== 1) {
    throw new Error('Expected `requestName` response code to be "1" but it was "' + code + '"');
  }

  // Connect to our service
  // https://github.com/JumpLink/node-mpris/blob/v0.0.2/example/play.js
  // https://github.com/JumpLink/node-mpris/blob/v0.0.2/mpris.js#L365
  mprisSubscriber.connect(MPRIS_NAME, function handleStart (err) {
    // If there was an error, throw it
    if (err) {
      throw err;
    }

    // Set up debug info
    console.log('connected');

    // Otherwise, open our URI
    mprisSubscriber.Player.OpenUri('file://hello.mp3', function handleOpenUri (err) {
      // If there was an error, throw it
      if (err) {
        throw err;
      }

      // Set up debug info
      console.log('OpenUri request sent');

      // Play our track
      mprisSubscriber.Player.Next(function handlePlay (err) {
        // If there was an error, throw it
        if (err) {
          throw err;
        }

        // Set up debug info
        console.log('Play request sent');
      });
    });
  });
});
