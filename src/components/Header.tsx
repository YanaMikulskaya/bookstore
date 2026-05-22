import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { UserPick } from './UserPick';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { ThemeToggle } from './ThemeToggle';
import { HeaderCart } from './HeaderCart';

export function Header(): React.ReactElement {
  const isLogin = true;

  return (
    <>
      <header className="p-3">
        <nav className="flex justify-between items-center gap-4">
          <HeaderLogo />

          <HeaderSearch />

          <div className="flex justify-end items-center gap-2">
            <ThemeToggle />
            <HeaderCart />
            {isLogin ? (
              <UserPick />
            ) : (
              <Button asChild>
                <a href="#">Войти</a>
              </Button>
            )}
          </div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
