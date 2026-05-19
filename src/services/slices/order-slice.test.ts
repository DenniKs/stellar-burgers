import reducer, {
  clearOrderModal,
  createOrder,
  getOrderByNumber
} from './order-slice';
import { TOrder } from '@utils-types';

const order = {
  _id: 'order-1',
  status: 'done',
  name: 'Test order',
  createdAt: '2026-05-19T00:00:00.000Z',
  updatedAt: '2026-05-19T00:00:00.000Z',
  number: 12345,
  ingredients: ['bun-1', 'main-1', 'bun-1']
} satisfies TOrder;

describe('order reducer', () => {
  test('sets order request state on create order request', () => {
    expect(
      reducer(undefined, createOrder.pending('request-id', ['bun-1']))
    ).toEqual({
      orderModalData: null,
      selectedOrder: null,
      orderRequest: true,
      selectedOrderRequest: false,
      error: null
    });
  });

  test('stores order modal data on create order success', () => {
    const state = reducer(
      undefined,
      createOrder.fulfilled({ number: 12345 }, 'request-id', ['bun-1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual({ number: 12345 });
  });

  test('stores error on create order failure', () => {
    const state = reducer(
      undefined,
      createOrder.rejected(new Error('Create failed'), 'request-id', ['bun-1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Create failed');
  });

  test('clears order modal data', () => {
    const state = reducer(
      {
        orderModalData: { number: 12345 },
        selectedOrder: null,
        orderRequest: false,
        selectedOrderRequest: false,
        error: null
      },
      clearOrderModal()
    );

    expect(state.orderModalData).toBeNull();
  });

  test('stores selected order on order details success', () => {
    const state = reducer(
      undefined,
      getOrderByNumber.fulfilled(order, 'request-id', 12345)
    );

    expect(state.selectedOrderRequest).toBe(false);
    expect(state.selectedOrder).toEqual(order);
  });
});
