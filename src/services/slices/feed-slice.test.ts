import reducer, { getFeed } from './feed-slice';

const feed = {
  success: true,
  orders: [
    {
      _id: 'order-1',
      status: 'done',
      name: 'Test order',
      createdAt: '2026-05-19T00:00:00.000Z',
      updatedAt: '2026-05-19T00:00:00.000Z',
      number: 12345,
      ingredients: ['bun-1', 'main-1', 'bun-1']
    }
  ],
  total: 10,
  totalToday: 2
};

describe('feed reducer', () => {
  test('sets loading state on request', () => {
    expect(reducer(undefined, getFeed.pending('request-id'))).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    });
  });

  test('stores feed data and clears loading state on success', () => {
    expect(reducer(undefined, getFeed.fulfilled(feed, 'request-id'))).toEqual({
      orders: feed.orders,
      total: feed.total,
      totalToday: feed.totalToday,
      isLoading: false,
      error: null
    });
  });

  test('stores error and clears loading state on failure', () => {
    const state = reducer(
      { orders: [], total: 0, totalToday: 0, isLoading: true, error: null },
      getFeed.rejected(new Error('Feed failed'), 'request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Feed failed');
  });
});
