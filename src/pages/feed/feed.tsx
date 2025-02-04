import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedsThunk } from '../../services/slices/order-slice';
import { AppDispatch, RootState } from 'src/services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector<RootState, TOrder[]>(
    (state) => state.orders.orders
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />;
};
