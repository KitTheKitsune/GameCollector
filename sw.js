const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

//a list of local resources we always want cached
const PRECACHE_URLS = [
  'index.html',
  './', //alias for index.html
  'css/style.css',
  'js/main.js',
  'images/hello-icon-128.png',
  'images/hello-icon-144.png',
  'images/hello-icon-152.png',
  'images/hello-icon-192.png',
  'images/hello-icon-196maskable.png',
  'images/hello-icon-256.png',
  'images/hello-icon-512.png',
  'sw.js'
  ];

//The install handler takes care of precacheing our resources as directed
self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open(PRECACHE).then(function(cache){
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

//the activate handler
self.addEventListener('activate',event => {
  console.log('Service worker activating . . .');
});

//the fetch handler
self.addEventListener('fetch',function(event) {
   event.respondWith(
       caches.match(event.request).then(function(response){
          return response || fetch(event.request);
       })
     );
});
