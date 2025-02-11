import { expect } from '@jest/globals';
import store, { rootReducer } from '../services/store';

describe('Тестирование store', () => {
  test('Тестирование работы RootReducer', () => {
    const rootReducerTest = rootReducer(undefined, { type: 'action' });
    expect(rootReducerTest).toEqual(store.getState());
  });
});
