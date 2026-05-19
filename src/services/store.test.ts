import { rootReducer } from './store';

describe('rootReducer', () => {
  test('returns the correct initial state for an unknown action', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderModalData: null,
        selectedOrder: null,
        orderRequest: false,
        selectedOrderRequest: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      profileOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      }
    });
  });
});
