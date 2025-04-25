// Service Worker Script

const CACHE_NAME = 'app-cache-v1';
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles/styles01.css",
  "/styles/styles02.css",
  "/styles/styles03.css",
  "/styles/styles04.css",
  "/scripts/scripts.js",
  "/favicons/favicon.ico",
  "/image01/logo.png",
  "/order.html",
  "/checkout.html",
  "/order.js",
  "/checkout.js",
  "/favourites.js"

];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached response if available, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});

