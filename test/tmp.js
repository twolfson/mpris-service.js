// Load in our dependencies
var mprisSubscriber = require('mpris');
var MprisService = require('../');

// TODO: Make either named test setups
//   e.g. `mprisUtils.createService('hello-world');
// or unique ones
//   e.g. `mprisUtils.createService(Math.random() + '');
// Prob the former

// Define our constants
var MPRIS_NAME = 'MprisTest';

// Create our MPRIS service
MprisService.createService({
  name: MPRIS_NAME
}, function handleCreateService (err, code, mprisService) {
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
