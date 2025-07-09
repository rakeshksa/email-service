let requestCount = 0;
const MAX_REQUESTS = 5;
const INTERVAL_MS = 10000;

setInterval(() => {
  requestCount = 0;
}, INTERVAL_MS);

export function checkRateLimit(): boolean {
  if (requestCount < MAX_REQUESTS) {
    requestCount++;
    return true;
  }
  return false;
}
