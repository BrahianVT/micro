import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

self.skipWaiting();
clientsClaim();

// Clean old caches
cleanupOutdatedCaches();

// Precache static assets only (excluding dynamic routes)
const manifest = self.__WB_MANIFEST.filter(entry => {
  // Filter out the root route and any other dynamic routes
  return entry.url !== '/';
});

precacheAndRoute(manifest);

// Handle navigation requests (HTML pages) with NetworkFirst strategy
// This is important for SSR applications
const navigationHandler = new NetworkFirst({
  cacheName: 'navigations',
  networkTimeoutSeconds: 3,
});

/* Register navigation route
const navigationRoute = new NavigationRoute(navigationHandler, {
  // Optionally, you can add a denylist for certain paths
  denylist: [/\/api\//],
});

registerRoute(navigationRoute);
*/