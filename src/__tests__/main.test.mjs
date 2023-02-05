import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUser } from '../api.mjs';

vi.mock('../api.mjs');

beforeEach(() => {
  fetchUser.mockResolvedValue({ name: 'Foo' });
});

describe('mock service module', () => {
  it('works!', async () => {
    const user = await fetchUser();
    expect(user).toEqual({ name: 'Foo' });
  });

  it('error', async () => {
    fetchUser.mockRejectedValue(new Error('oh no'));
    let error;
    try {
      const user = await fetchUser();
    } catch (err) {
      error = err;
    }
    expect(error.message).toBe('oh no');
  });

  it('works again', async () => {
    const user = await fetchUser();
    expect(user).toEqual({ name: 'Foo' });
  });
});
