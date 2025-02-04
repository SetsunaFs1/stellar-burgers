import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedsThunk } from '../../services/slices/order-slice';
import { AppDispatch, RootState } from '../../services/store';
import { getIngredientsThunk } from '../../services/slices/ingredients-slice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector<RootState, TOrder[]>(
    (state) => state.orders.feed?.orders ?? []
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />
  );
};
