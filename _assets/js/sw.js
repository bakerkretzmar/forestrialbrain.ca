const VER = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const PRE = 'pre_' + VER;
const READ = 'read_' + VER;

const PRE_URLS = [
  '/',
  '/index.html',
  '/home/',
  '/home/index.html',
  '/manifest.json',
  // '/SuisseWorks-Bold.ttf',
  // '/SuisseWorks-Bold.woff',
  // '/SuisseWorks-Bold.woff2',
  // '/SuisseWorks-BoldItalic.ttf',
  // '/SuisseWorks-BoldItalic.woff',
  // '/SuisseWorks-BoldItalic.woff2',
  // '/SuisseWorks-Book.ttf',
  // '/SuisseWorks-Book.woff',
  // '/SuisseWorks-Book.woff2',
  // '/SuisseWorks-BookItalic.ttf',
  // '/SuisseWorks-BookItalic.woff',
  // '/SuisseWorks-BookItalic.woff2',
  // '/icon-128x128.png',
  // '/apple-touch-icon.png',
  // '/chrome-touch-icon.png',
  // '/ms-touch-icon.png'
];

self.addEventListener('install', function(event) {
  console.log('SW-'+VER+' --> Installing worker and caching resources...');
  event.waitUntil(
    caches.open(PRE)
      .then(function(cache) { cache.addAll(PRE_URLS); })
      .then(function() {
        console.log('SW-'+VER+' --> Install completed and resources cached!');
        self.skipWaiting();
      })
      .catch(function(error) { console.error('SW-'+VER+' --> Install and caching failed: ', err); })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith(self.location.origin)) {
    console.log('SW-'+VER+' --> Handling fetch event for ', event.request.url);

    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
          console.log('SW-'+VER+' --> Found response in cache:', cachedResponse);
          return cachedResponse;
        }

        console.log('SW-'+VER+' --> No response for %s found in cache. About to fetch from network...', event.request.url);

        return caches.open(READ).then(function(cache) {
          return fetch(event.request).then(function(response) {
            console.log('SW-'+VER+' --> Response for %s from network is: %O. Caching response for next time.', event.request.url, response);
            return cache.put(event.request, response.clone()).then(function() {
              return response;
            });
          }).catch(function(error) {
            console.error('SW-'+VER+' --> Read-through fetch and caching failed: ', error);
            throw error;
          });
        });
      })
    );
  } else {
    console.log('SW-'+VER+' --> Ignored cross-origin request: ', event.request.url);
  }
});

self.addEventListener('activate', function(event) {
  const currentCaches = [PRE, READ];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return cacheNames.filter(function(cacheName) { return !currentCaches.includes(cacheName); });
    }).then(function(cachesToDelete) {
      return Promise.all(cachesToDelete.map(function(cacheToDelete) {
        console.log('SW-'+VER+' --> Deleting stale cache: ' + cacheToDelete);
        return caches.delete(cacheToDelete);
      }));
    }).then(function() { self.clients.claim(); })
  );
});
