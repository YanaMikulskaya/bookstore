import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';

export function Layout(): React.ReactElement {
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
