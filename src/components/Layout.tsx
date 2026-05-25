import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Outlet } from 'react-router';
import { initializeFavorites } from '@/redux/favorites-slice';
import { initializeCart } from '@/redux/cart-slice';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';

export function Layout(): React.ReactElement {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => !!state.auth.jwt);

  useEffect(() => {
    dispatch(initializeFavorites(isAuth));
    dispatch(initializeCart(isAuth));
  }, [dispatch, isAuth]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-[1180px] flex-1 px-[30px] flex flex-col">
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </div>
  );
}
