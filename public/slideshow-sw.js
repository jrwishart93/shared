/* Lightweight slideshow cache for old photo-frame devices. */
var CACHE_NAME = "family-slideshow-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", function (event) {
  var data = event.data || {};
  if (data.type !== "CACHE_SLIDES" || !data.urls || !data.urls.length) {
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(data.urls);
    }).catch(function () {
      return undefined;
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
        return response;
      });
    })
  );
});
