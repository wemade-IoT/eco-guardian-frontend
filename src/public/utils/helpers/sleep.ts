export function simulateRequest(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}