import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface Order {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: TFeedsResponse | null;
}

export const getFeedsThunk = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const initialState: Order = {
  orderRequest: false,
  orderModalData: null,
  orders: [],
  isLoading: false,
  error: null,
  feed: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFeedsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.error.message as string) ?? null;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.feed = action.payload;
    });
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.error.message as string) ?? null;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = (action.error.message as string) ?? null;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = null;
      state.orderModalData = action.payload.order;
    });
    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state, action) => {
      state.error = (action.error.message as string) ?? null;
      state.isLoading = false;
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orderModalData = action.payload.orders[0];
    });
  }
});

export const { closeOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
