import { FC, useMemo } from 'react';
import {
  TConstructorIngredient,
  TConstructorItems,
  TOrder
} from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import {
  closeOrder,
  orderBurgerThunk
} from '../../services/slices/order-slice';
import { clearIngredients } from '../../services/slices/ingredients-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const constructorItems = useSelector<RootState, TConstructorItems>(
    (state) => state.ingredients.constructorItems
  );

  const orderRequest = useSelector<RootState, boolean>(
    (state) => state.orders.orderRequest
  );

  const orderModalData = useSelector<RootState, TOrder | null>(
    (state) => state.orders.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredients) => ingredients._id),
      constructorItems.bun._id
    ];
    /** TODO: добавить роут */
    // if (!user) {
    //   navigate('/login');
    // } else {
    dispatch(orderBurgerThunk(newOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
