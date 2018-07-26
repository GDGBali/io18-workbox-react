/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

const createQueue = queueName =>
  new workbox.backgroundSync.Plugin(queueName, {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
  });

const favUrl = /(?:http:\/\/localhost:1337)?\/restaurants.*\?is_favorite.+/;
const reviewsUrl = /(?:http:\/\/localhost:1337)?\/restaurants.*\?is_favorite.+/;

workbox.routing.registerRoute(
  favUrl,
  workbox.strategies.networkOnly({
    plugins: [createQueue('favoriteQueue')]
  }),
  'PUT'
);

workbox.routing.registerRoute(
  reviewsUrl,
  workbox.strategies.networkOnly({
    plugins: [createQueue('reviewsQueue')]
  }),
  'POST'
);
