import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { getUser, logout } from '@/redux/auth-slice';
import { Button } from './ui/button';
import { SkeletonUserPick } from './SkeletonUserPick';
import { UserPick } from './UserPick';
import { resetFavorites } from '@/redux/favorites-slice';
import { resetCart } from '@/redux/cart-slice';

export function HeaderUser(): React.ReactElement {
  const { user, loading, jwt } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && !user && !loading) {
      dispatch(getUser());
    }
  }, [dispatch, user, jwt, loading]);

  if (loading) {
    return <SkeletonUserPick />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <UserPick name={user.name} role={user.role} />
        <Button
          onClick={() => {
            dispatch(logout());
            dispatch(resetFavorites());
            dispatch(resetCart());
          }}
        >
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => {
        navigate('/auth/login');
      }}
    >
      Войти
    </Button>
  );
}
