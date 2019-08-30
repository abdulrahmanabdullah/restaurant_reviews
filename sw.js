const CASH_NAME = ['v1'];
let cachesAsset = [
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg'
    , 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg'
];
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                console.log('Opend cache');
                return cache.addAll(cachesAsset);
            })
            .then(() => self.skipWaiting())
    );
});


//Activate event
self.addEventListener('activate', e => {
    // Clear old cach 
    e.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(
                    cache => {
                        if (!cacheNames.includes(cache)) {
                            caches.delete(cache);
                        } 
                    }
                )
            )
        )
    );
});

//Call fetch event - offline event 
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) return response;
            return fetch(e.request);
        }).catch(() => caches.match(e.request))
    );
});