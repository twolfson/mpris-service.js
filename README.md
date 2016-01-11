# mpris-service.js [![Build status](https://travis-ci.org/twolfson/mpris-service.js.svg?branch=master)](https://travis-ci.org/twolfson/mpris-service.js)

JavaScript based MPRIS service

## This library is still a work in progress and incomplete

// TODO: Add back array handling
// TODO: Take care of all TODOs

**Missing/broken features:**

- `GetAll` not supported for `Root`
    - TODO: Link to upstream issue
- Using `Set` on properties not supported
    - As a result, changes to `Fullscreen` etc will not be supported
    - TODO: Link to upstream issue

## Getting Started
Install the module with: `npm install mpris-service.js`

```js
var mprisService = require('mpris-service.js');
mprisService(); // 'awesome'
```

## Documentation
We export a `MprisService` constructor as our `module.exports`

### `new MprisService(params)`
Constructor a new `MprisService`. It creates a DBus connection and sets up its interfaces. However, we don't request a name from DBus.

- params `Object` - Container for parameters
    - Root `Object` - Container for methods/properties for our the root `MediaPlayer2` interface
        - See [RootInterface](#rootinterface) for documentation
    - TODO: Document `TrackList`, `Playlists`

### `new RootInterface(params)`
Interface implementation for `MediaPlayer2`

http://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html

- params `Object` - Same parameters as `new MprisService(params)`
    - Root `Object` - Container for parameters specific to our interface
        - Raise `Function` - Optional method to invoke to raise our media player
            - If this is provided, we will set `CanRaise` to `true`
            - Otherwise, `CanRaise` will be `false`
        - Quit `Function` - Optional method to invoke to quit our media player
            - If this is provided, we will set `CanQuit` to `true`
            - Otherwise, `CanQuit` will be `false`
        - Fullscreen `Boolean` - Optional boolean indicating fullscreen status
            - If this is provided, then `CanSetFullscreen` must be set as well
            - Due to upstream issues, we cannot handle write actions
        - CanSetFullscreen `Boolean` - Optional boolean indicating that fullscreen status can remotely be set
            - If this is provided, then `Fullscreen` must be set as well

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.svg
[gratipay]: https://www.gratipay.com/twolfson/

## Unlicense
As of Jan 06 2016, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
