import reducer, { getProfileOrders } from './profile-orders-slice';
import { TOrder } from '@utils-types';

const orders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Test order',
    createdAt: '2026-05-19T00:00:00.000Z',
    updatedAt: '2026-05-19T00:00:00.000Z',
    number: 12345,
    ingredients: ['bun-1', 'main-1', 'bun-1']
  }
];

describe('profileOrders reducer', () => {
  test('sets loading state on request', () => {
    expect(reducer(undefined, getProfileOrders.pending('request-id'))).toEqual({
      orders: [],
      isLoading: true,
      error: null
    });
  });

  test('stores orders and clears loading state on success', () => {
    expect(
      reducer(undefined, getProfileOrders.fulfilled(orders, 'request-id'))
    ).toEqual({
      orders,
      isLoading: false,
      error: null
    });
  });

  test('stores error and clears loading state on failure', () => {
    const state = reducer(
      { orders: [], isLoading: true, error: null },
      getProfileOrders.rejected(new Error('Orders failed'), 'request-id')
    );

    expect(state).toEqual({
      orders: [],
      isLoading: false,
      error: 'Orders failed'
    });
  });
});
