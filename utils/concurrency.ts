/**
 * Limits concurrency of an async map operation.
 * Useful for preventing API rate-limiting or browser lockups during heavy processing.
 */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrencyLimit: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextItemIndex = 0;

  const workers = Array.from({ length: Math.min(concurrencyLimit, items.length) }, async () => {
    while (nextItemIndex < items.length) {
      const currentIdx = nextItemIndex++;
      results[currentIdx] = await mapper(items[currentIdx], currentIdx);
    }
  });

  await Promise.all(workers);
  return results;
}

/**
 * Yields control back to the browser event loop to keep the UI responsive.
 */
export async function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
