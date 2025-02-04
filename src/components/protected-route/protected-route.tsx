import { TUser } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from 'src/services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { checkUser } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const isAuthChecked = useSelector<RootState, boolean>(
    (state) => state.user.isAuthChecked
  );
  const user = useSelector<RootState, TUser | null>((state) => state.user.user);

  useEffect(() => {
    dispatch(checkUser());
  }, [location.pathname]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { from: { pathname: '/' } };
    return <Navigate replace to='/' state={{ from }} />;
  }

  return children;
};
