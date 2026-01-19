const CACHE_NAME = "meflo-v3-mf-icon";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./bewertung.html",
  "./fragezeichen.html",
  "./powerpoint.html",
  "./assets/team.png",
  "./icons/icon-mf-192.png",
  "./icons/icon-mf-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "LOGIN_SUCCESS") {
    self.registration.showNotification("MEFLO", {
      body: "Erfolgreich angemeldet ✅",
      icon: "icons/icon-mf-192.png",
      badge: "icons/icon-mf-192.png"
    });
  }
});
