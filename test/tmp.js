var mprisSubscriber = null;
function handleCreateService(err, code, mprisService) {
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
}
