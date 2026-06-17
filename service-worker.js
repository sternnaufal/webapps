self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('webapps-v2').then(function (c) {
      return c.addAll(['/', '/style.css', '/sidebar.js', '/manifest.json']);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) { return r || fetch(e.request); })
  );
});
