(global => {
  'use strict';

  // Load the sw-toolbox library
  importScripts('./sw-toolbox.js');

  // global.toolbox.options.debug = true;

  // Set up a handler for HTTP GET requests:
  global.toolbox.router.get(/fonts\.gstatic\.com\//, global.toolbox.cacheFirst, {
    cache: {
      name: 'google-fonts',
      maxEntries: 10,
      maxAgeSeconds: 30
    }
  });
  global.toolbox.router.get(/\.googleapis\.com\//, global.toolbox.cacheFirst, {
    cache: {
      name: 'google-apis',
      maxEntries: 10,
      maxAgeSeconds: 30
    }
  });

  global.toolbox.router.get(/twemoji\.maxcdn\.com\//, global.toolbox.cacheFirst, {
    cache: {
      name: 'twemojis',
      maxEntries: 500,
      maxAgeSeconds: 30
    }
  });

  global.toolbox.router.get(/\.mapbox\.com\//, global.toolbox.cacheFirst, {
    cache: {
      name: 'mapbox',
      maxEntries: 500,
      maxAgeSeconds: 30
    }
  });
  global.toolbox.router.default = global.toolbox.networkFirst;

  // Boilerplate to ensure our service worker takes control of the page as soon
  // as possible.
  global.addEventListener('install',
      event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate',
      event => event.waitUntil(global.clients.claim()));
})(self);
