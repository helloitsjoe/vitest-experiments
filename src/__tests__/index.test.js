// const { makeLRUCache } = require('../index');
import { describe, it, expect } from 'vitest';
import { makeLRUCache } from '../index';

describe('LRU', () => {
  it('set/get', () => {
    const lru = makeLRUCache(10);
    expect(lru.get('foo')).toBeUndefined();
    lru.set('foo', 'bar');
    expect(lru.get('foo')).toBe('bar');
  });

  it('evicts least recently used from cache', () => {
    const lru = makeLRUCache(2);
    expect(lru.get('foo')).toBeUndefined();

    lru.set('foo', 'bar');
    expect(lru.get('foo')).toBe('bar');
    expect(lru.get('bar')).toBeUndefined();
    expect(lru.get('baz')).toBeUndefined();

    lru.set('bar', 'baz');
    expect(lru.get('foo')).toBe('bar');
    expect(lru.get('bar')).toBe('baz');
    expect(lru.get('baz')).toBeUndefined();

    lru.set('baz', 'qux');
    expect(lru.get('foo')).toBeUndefined();
    expect(lru.get('bar')).toBe('baz');
    expect(lru.get('baz')).toBe('qux');
  });
});
