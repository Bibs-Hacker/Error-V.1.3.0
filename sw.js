const CACHE = 'neon-forge-v1';
const FILES = [
  'neon_forge_massive.html',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto+Mono&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

// Offline fallback
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('neon_forge_massive.html'))
    );
  }
});
