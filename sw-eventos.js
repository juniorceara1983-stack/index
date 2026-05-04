const CACHE_NAME = 'cache-eventos-v2';
const assets = [
  './index.html',
  './manifest-eventos.json',
  './style.css',
  './App.js',
  './sistemaOuvir.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
