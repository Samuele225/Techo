const CACHE = "techo-cache-v1";

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll([
                "index.html",
                "Techo.css",
                "Techo.js",
                "todo.html",
                "todo.js",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});