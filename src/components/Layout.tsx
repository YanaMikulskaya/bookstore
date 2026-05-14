import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
//import { Outlet } from 'react-router';
type TitleProps = {
  children: React.ReactNode;
};

export function Layout({ children }: TitleProps): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-[1180px] flex-1 px-[30px] flex flex-col">
        <Main>
          {children}
          {/*<Outlet />*/}
        </Main>
        <Footer />
      </div>
    </div>
  );
}
