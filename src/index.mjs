// Simple version: capacity is number of keys
export function makeLRUCache(capacity) {
  const cache = new Map();

  function get(key) {
    const { value } = cache.get(key) || {};
    if (!value) {
      return;
    }
    cache.set(key, { value, updated: performance.now() });
    return value;
  }

  function set(key, value) {
    if (cache.size >= capacity) {
      let lru = { key: '', updated: Infinity };

      for (const [key, { updated }] of cache.entries()) {
        if (updated < lru.updated) {
          lru = { key, updated };
        }
      }
      const deleted = cache.delete(lru.key);
    }

    cache.set(key, { value, updated: performance.now() });
  }

  return { get, set };
}
