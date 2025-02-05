import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  closeOrder,
  orderBurgerThunk
} from '../../services/slices/order-slice';
import { clearIngredients } from '../../services/slices/ingredients-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const constructorItems = useSelector(
    (state) => state.ingredients.constructorItems
  );

  const orderRequest = useSelector((state) => state.orders.orderRequest);

  const orderModalData = useSelector((state) => state.orders.orderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    }

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredients) => ingredients._id),
      constructorItems.bun._id
    ];
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
