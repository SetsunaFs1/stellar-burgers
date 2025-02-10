import { expect, test, describe } from '@jest/globals';
import {
  ingredientReducer,
  getIngredientsThunk,
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDounIngredient,
  clearIngredients,
  initialState
} from '../services/slices/ingredients-slice';
import { AppStore } from '../services/store';
import { TConstructorIngredient, TOrder } from '../utils/types';
import { orderBurgerApi, getIngredientsApi } from '../utils/burger-api';
import { userReducer } from '../services/slices/user-slice';
import { orderReducer } from '../services/slices/order-slice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../utils/burger-api');

const actions = {
  pending: {
    type: getIngredientsThunk.pending.type,
    payload: null
  },
  fulfilled: {
    type: getIngredientsThunk.fulfilled.type,
    payload: ['ingredient1', 'ingredient2', 'ingredient3']
  },
  rejected: {
    type: getIngredientsThunk.rejected.type
  }
};

describe('Тестирование reducer ingredientsSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientReducer,
        orders: orderReducer,
        user: userReducer
      }
    });
  });

  describe('Тестирование синхронных actions', () => {
    test('Тестирование action addIngredient', () => {
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient));
      ingredient.id =
        store.getState().ingredients.constructorItems.ingredients[0].id;
      expect(store.getState().ingredients.constructorItems.ingredients).toEqual(
        [ingredient]
      );
    });

    test('Тестирование action deleteIngredient', () => {
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient));
      ingredient.id =
        store.getState().ingredients.constructorItems.ingredients[0].id;
      store.dispatch(deleteIngredient(ingredient));
      expect(store.getState().ingredients.constructorItems.ingredients).toEqual(
        []
      );
    });

    test('Тестирование action moveUpIngredient', () => {
      const ingredient1: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      const ingredient2: TConstructorIngredient = {
        _id: '2',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient1));
      store.dispatch(addIngredient(ingredient2));
      ingredient1.id =
        store.getState().ingredients.constructorItems.ingredients[0].id;
      ingredient2.id =
        store.getState().ingredients.constructorItems.ingredients[1].id;
      store.dispatch(moveUpIngredient(ingredient2));
      expect(store.getState().ingredients.constructorItems.ingredients).toEqual(
        [ingredient2, ingredient1]
      );
    });

    test('Тестирование action moveDounIngredient', () => {
      const ingredient1: TConstructorIngredient = {
        _id: '1',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      const ingredient2: TConstructorIngredient = {
        _id: '2',
        name: 'ingredient',
        type: 'ingredient',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg',
        id: ''
      };
      store.dispatch(addIngredient(ingredient1));
      store.dispatch(addIngredient(ingredient2));
      ingredient1.id =
        store.getState().ingredients.constructorItems.ingredients[0].id;
      ingredient2.id =
        store.getState().ingredients.constructorItems.ingredients[1].id;
      store.dispatch(moveDounIngredient(ingredient1));
      expect(store.getState().ingredients.constructorItems.ingredients).toEqual(
        [ingredient2, ingredient1]
      );
    });

    test('Тестирование action clearIngredients', () => {
      const orderData: TOrder = {
        _id: '1',
        status: 'active',
        number: 999,
        name: 'order',
        ingredients: [],
        createdAt: '2024-08-08T10:10:10.999Z',
        updatedAt: '2024-08-08T10:10:10.999Z'
      };
      store.dispatch(clearIngredients());
      store.dispatch({
        type: 'order/orderBurger/fulfilled',
        payload: {
          order: orderData
        }
      });
      expect(store.getState().orders.orderModalData).toEqual(orderData);
      store.dispatch(clearIngredients());
      expect(store.getState().ingredients.constructorItems.bun).toEqual(null);
      expect(store.getState().ingredients.constructorItems.ingredients).toEqual(
        []
      );
    });
  });
  describe('Тестирование асинхронного action getIngredientsThunk', () => {
    test('Тестирование thunk getIngredientsThunk.pending', () => {
      const state = ingredientReducer(initialState, actions.pending);
      expect(state.isLoading).toBe(true);
    });
    test('Тестирование thunk getIngredientsThunk.fulfilled', () => {
      const state = ingredientReducer(initialState, actions.fulfilled);
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toBe(actions.fulfilled.payload);
    });
    test('Тестирование thunk getIngredientsThunk.rejected', () => {
      const state = ingredientReducer(initialState, actions.rejected);
      expect(state.isInit).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });
});
