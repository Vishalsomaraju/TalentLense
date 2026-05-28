/**
 * @module ServiceWorker
 * @description Cache-first service worker for PWA offline capability.
 * Strategy: cache-first for static assets, network fallback for misses.
 * @version 1.0.0
 */

const CACHE_NAME = '__APP_NAME__-v1';
const SHELL_ASSETS = ['/', '/index.html'];

// Install: pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: evict old caches to prevent stale content
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const toCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') return caches.match('/index.html');
          return new Response('Network error', { status: 408 });
        });
    })
  );
});
