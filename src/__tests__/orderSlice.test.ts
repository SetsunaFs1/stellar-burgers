import { expect, test, describe } from '@jest/globals';
import {
  orderReducer,
  orderBurgerThunk,
  getOrdersThunk,
  getFeedsThunk,
  initialState
} from '../services/slices/order-slice';

const orderBurgerThunkActions = {
  pending: {
    type: orderBurgerThunk.pending.type,
    payload: null
  },
  fulfilled: {
    type: orderBurgerThunk.fulfilled.type,
    payload: { order: ['order1', 'order2', 'order3'] }
  },
  rejected: {
    type: orderBurgerThunk.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

const getOrdersThunkActions = {
  pending: {
    type: getOrdersThunk.pending.type,
    payload: null
  },
  fulfilled: {
    type: getOrdersThunk.fulfilled.type,
    payload: ['order1', 'order2', 'order3']
  },
  rejected: {
    type: getOrdersThunk.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

const getFeedsThunkActions = {
  pending: {
    type: getFeedsThunk.pending.type,
    payload: null
  },
  fulfilled: {
    type: getFeedsThunk.fulfilled.type,
    payload: {
      orders: ['order1', 'order2', 'order3'],
      total: 3,
      totalToday: 3
    }
  },
  rejected: {
    type: getFeedsThunk.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer orderSlice', () => {
  describe('Тестирование асинхронного action orderBurgerThunk', () => {
    test('Тестирование thunk orderBurgerThunk.pending', () => {
      const state = orderReducer(initialState, orderBurgerThunkActions.pending);
      expect(state.error).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk orderBurgerThunk.fulfilled', () => {
      const state = orderReducer(
        initialState,
        orderBurgerThunkActions.fulfilled
      );
      expect(state.error).toBeNull;
      expect(state.isLoading).toBe(false);
      expect(state.orderModalData).toEqual(
        orderBurgerThunkActions.fulfilled.payload.order
      );
    });
    test('Тестирование thunk orderBurgerThunk.rejected', () => {
      const state = orderReducer(
        initialState,
        orderBurgerThunkActions.rejected
      );
      expect(state.error).toBe(orderBurgerThunkActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование асинхронного action getOrdersThunkActions', () => {
    test('Тестирование thunk getOrdersThunkActions.pending', () => {
      const state = orderReducer(initialState, getOrdersThunkActions.pending);
      expect(state.error).toBeNull;
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk getOrdersThunkActions.fulfilled', () => {
      const state = orderReducer(initialState, getOrdersThunkActions.fulfilled);
      expect(state.error).toBeNull;
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(getOrdersThunkActions.fulfilled.payload);
    });
    test('Тестирование thunk getOrdersThunkActions.rejected', () => {
      const state = orderReducer(initialState, getOrdersThunkActions.rejected);
      expect(state.error).toBe(getOrdersThunkActions.rejected.error.message);
      expect(state.isLoading).toBe(false);
    });
  });
  describe('Тестирование reducer ordersSlice', () => {
    describe('Тестирование асинхронного action getFeedsThunks', () => {
      test('Тестирование thunk getFeedsThunkActions.pending', () => {
        const state = orderReducer(initialState, getFeedsThunkActions.pending);
        expect(state.error).toBeNull;
        expect(state.isLoading).toBe(true);
      });
      test('Тестирование thunk getFeedsThunkActions.fulfilled', () => {
        const state = orderReducer(
          initialState,
          getFeedsThunkActions.fulfilled
        );
        expect(state.feed?.orders).toBe(
          getFeedsThunkActions.fulfilled.payload.orders
        );
        expect(state.feed?.total).toBe(getFeedsThunkActions.fulfilled.payload.total);
        expect(state.feed?.totalToday).toBe(
          getFeedsThunkActions.fulfilled.payload.totalToday
        );
      });
      test('Тестирование thunk getFeedsThunkActions.rejected', () => {
        const state = orderReducer(initialState, getFeedsThunkActions.rejected);
        expect(state.error).toBe(getFeedsThunkActions.rejected.error.message);
        expect(state.isLoading).toBe(false);
      });
    });
  });
});
