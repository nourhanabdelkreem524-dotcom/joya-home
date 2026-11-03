// Network first so every push shows up at once; the cached copy is only for opening without a connection.
const CACHE = 'joya-F5C012BD4D';
const FILES = ["./","./index.html","./manifest.webmanifest","./assets/hero-2.webp","./assets/jc-bouquets.png","./assets/jc-cakes.png","./assets/jc-candles.png","./assets/jc-chocolate.png","./assets/jc-flowers-gifts.png","./assets/jc-kids.png","./assets/jc-men.png","./assets/jc-month.png","./assets/jc-perfumes.png","./assets/jc-premium.png","./assets/jc-roses.png","./assets/jc-voucher.png","./assets/jc-women.png","./assets/jm-mother.png","./assets/jp-1.jpg","./assets/jp-2.jpg","./assets/jp-3.jpg","./assets/jp-4.jpg","./assets/jp-5.jpg","./assets/logo-cartier.svg","./assets/logo-chanel.svg","./assets/logo-dior.svg","./assets/logo-rolex.svg","./assets/logo-swarovski.svg","./assets/logo-tomford.svg","./assets/thmanyahsans-Bold.woff2","./assets/thmanyahsans-Medium.woff2","./assets/thmanyahsans-Regular.woff2","./assets/thmanyahserifdisplay-Black.woff2","./assets/thmanyahserifdisplay-Bold.woff2","./assets/thmanyahserifdisplay-Light.woff2","./assets/thmanyahserifdisplay-Medium.woff2","./assets/thmanyahserifdisplay-Regular.woff2","./assets/val-bear.png","./assets/val-frame.png","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512-maskable.png","./icons/icon-512.png"];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
  );
});