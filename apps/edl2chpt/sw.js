self.addEventListener("fetch", function(event) {
  console.log(`DUMMY SERVICE WORKER`)
});
self.addEventListener("install", function(event) {
  self.skipWaiting();
  console.log(`Installed`, event);
});
self.addEventListener("activate", function(event) {
  console.log(`Activated`, event);
});
self.addEventListener("push", function(event) {
  console.log(`Received push`, event);
});