// Al instalar el Service Worker, se almacenan los archivos en caché
self.addEventListener('install', (event) => {
  console.log('Service Worker installing .');
  event.waitUntil(
    caches.open('reloj-pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon/tiempo.png',
        '/icon/reloj.png',
        '/app.js',
        '/styles.css',
      ]);
    })
  );
});

// Al activar el Service Worker, eliminamos cualquier caché anterior
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  const cacheWhitelist = ['reloj-pwa-cache']; 
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/hora')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open('reloj-pwa-cache').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      }).catch(() => {
        return caches.match('/index.html');
      })
    );
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
