import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { clearConstructor } from './constructor-slice';
import { TOrder } from '@utils-types';

type TOrderModalData = {
  number: number;
};

type TOrderState = {
  orderModalData: TOrderModalData | null;
  selectedOrder: TOrder | null;
  orderRequest: boolean;
  selectedOrderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  selectedOrder: null,
  orderRequest: false,
  selectedOrderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { dispatch }) => {
    const data = await orderBurgerApi(ingredients);
    dispatch(clearConstructor());
    return { number: data.order.number };
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0] || null;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.selectedOrderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrderRequest = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.selectedOrderRequest = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearOrderModal, clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
