import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersThunk } from '../../services/slices/order-slice';
import { AppDispatch, RootState } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector<RootState, TOrder[]>(
    (state) => state.orders.orders
  );

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
