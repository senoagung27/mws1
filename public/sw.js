let appVersion = 'v1.00';

//file to cache
let files = [
    './',
    './index.html',
    './images/Custom-Icon-Design-Pretty-Office-9-Font.ico',
    './images/home-icon.png',
    './images/WhatsApp Image 2018-08-28 at 19.48.43.jpeg',
    './images/Martz90-Circle-Calculator.ico',
    './images/map_parking_icon-01.png',
    './images/maps-icon.png',
    './images/coming_soon-512.png',
]

//install (caches files)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appVersion)
        .then(cache => {
            return cache.addAll(files)
            .catch(err => {
                console.error('Error adding files to cache', err);
            })
        })
    )
    console.info('SW Installed');
    self.skipWaiting();
})

//activate (manage old caches)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== appVersion){
                        console.info('Deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
    return self.clients.claim();
})

//fetch (control network request)
self.addEventListener('fetch', event => {
    console.info('SW fetch', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            return res || fetch(event.request);
        })
    )
})