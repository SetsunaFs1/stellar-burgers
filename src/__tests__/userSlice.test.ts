import { expect, test, describe, jest, beforeAll } from '@jest/globals';
import {
  userReducer,
  registerUser,
  loginUser,
  logout,
  updateUser,
  checkUser,
  initialState
} from '../services/slices/user-slice';
import { setCookie, deleteCookie } from '../utils/cookie';

jest.mock('../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const registerUserActions = {
  pending: {
    type: registerUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: registerUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' }, accessToken: 'token' }
  },
  rejected: {
    type: registerUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const loginUserActions = {
  pending: {
    type: loginUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: loginUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' }, accessToken: 'token' }
  },
  rejected: {
    type: loginUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const logoutUserActions = {
  pending: {
    type: logout.pending.type,
    payload: null
  },
  fulfilled: {
    type: logout.fulfilled.type,
    payload: null
  },
  rejected: {
    type: logout.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const updateUserActions = {
  pending: {
    type: updateUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: updateUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' } }
  },
  rejected: {
    type: updateUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};
const checkIsUserLoggedActions = {
  pending: {
    type: checkUser.pending.type,
    payload: null
  },
  fulfilled: {
    type: checkUser.fulfilled.type,
    payload: { user: { name: 'name', email: 'email' } }
  },
  rejected: {
    type: checkUser.rejected.type,
    error: { message: 'ErrorMessage' }
  }
};

describe('Тестирование reducer userSlice', () => {
  describe('Тестирование асинхронного action registerUserActions', () => {
    test('Тестирование thunk registerUser.pending', () => {
      const state = userReducer(initialState, registerUserActions.pending);
      expect(state.error).toBeNull;
    });
    test('Тестирование thunk registerUser.fulfilled', () => {
      const state = userReducer(initialState, registerUserActions.fulfilled);
      expect(state.user).toEqual(registerUserActions.fulfilled.payload.user);
      expect(state.isAuthChecked).toBe(true);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        registerUserActions.fulfilled.payload.accessToken
      );
    });
    test('Тестирование thunk registerUser.rejected', () => {
      const state = userReducer(initialState, registerUserActions.rejected);
      expect(state.error).toBe(registerUserActions.rejected.error.message);
    });
  });
  describe('Тестирование асинхронного action loginUserActions', () => {
    test('Тестирование thunk loginUser.pending', () => {
      const state = userReducer(initialState, loginUserActions.pending);
      expect(state.error).toBeNull;
    });
    test('Тестирование thunk loginUser.fulfilled', () => {
      const state = userReducer(initialState, loginUserActions.fulfilled);
      expect(state.user).toEqual(loginUserActions.fulfilled.payload.user);
      expect(state.isAuthChecked).toBe(true);
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        loginUserActions.fulfilled.payload.accessToken
      );
    });
    test('Тестирование thunk loginUser.rejected', () => {
      const state = userReducer(initialState, loginUserActions.rejected);
      expect(state.error).toBe(loginUserActions.rejected.error.message);
    });
  });
  describe('Тестирование асинхронного action logoutUserActions', () => {
    test('Тестирование thunk logoutUser.pending', () => {
      const state = userReducer(initialState, logoutUserActions.pending);
      expect(state.error).toBeNull;
    });
    test('Тестирование thunk logoutUser.fulfilled', () => {
      const state = userReducer(initialState, logoutUserActions.fulfilled);
      expect(state.user).toBeNull;
      expect(state.isAuthChecked).toBe(false);
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    });
    test('Тестирование thunk logoutUser.rejected', () => {
      const state = userReducer(initialState, logoutUserActions.rejected);
      expect(state.error).toBe(logoutUserActions.rejected.error.message);
    });
  });
  describe('Тестирование асинхронного action updateUserActions', () => {
    test('Тестирование thunk updateUser.pending', () => {
      const state = userReducer(initialState, updateUserActions.pending);
      expect(state.error).toBeNull;
    });
    test('Тестирование thunk updateUser.fulfilled', () => {
      const state = userReducer(initialState, updateUserActions.fulfilled);
      expect(state.user).toEqual(updateUserActions.fulfilled.payload.user);
      expect(state.isAuthChecked).toBe(true);
    });
    test('Тестирование thunk updateUser.rejected', () => {
      const state = userReducer(initialState, updateUserActions.rejected);
      expect(state.error).toBe(updateUserActions.rejected.error.message);
    });
  });
  describe('Тестирование асинхронного action checkIsUserLoggedActions', () => {
    test('Тестирование thunk checkIsUserLogged.fulfilled', () => {
      const state = userReducer(
        initialState,
        checkIsUserLoggedActions.fulfilled
      );
      expect(state.user).toEqual(
        checkIsUserLoggedActions.fulfilled.payload.user
      );
      expect(state.isAuthChecked).toBe(true);
    });
    test('Тестирование thunk checkIsUserLogged.rejected', () => {
      const state = userReducer(
        initialState,
        checkIsUserLoggedActions.rejected
      );
      expect(state.error).toBe(checkIsUserLoggedActions.rejected.error.message);
    });
  });
});
