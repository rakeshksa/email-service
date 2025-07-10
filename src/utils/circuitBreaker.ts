let failureCount = 0;
let open = false;

export function shouldUseProvider(): boolean {
  return !open;
}

export function recordFailure() {
  failureCount++;
  if (failureCount > 3) open = true;
}
