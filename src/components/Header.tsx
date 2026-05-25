import React from 'react';
import { Separator } from '@/components/ui/separator';
import { HeaderUser } from './HeaderUser';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';
import { HeaderCart } from './HeaderCart';

export function Header(): React.ReactElement {
  return (
    <>
      <header className="p-3">
        <nav className="flex justify-between items-center gap-4">
          <HeaderLogo />

          <HeaderSearch />

          <div className="flex justify-end items-center gap-2">
            <ThemeToggle />
            <HeaderCart />

            <HeaderUser />
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
