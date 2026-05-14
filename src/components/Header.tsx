import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';
import { UserPick } from './UserPick';
import { ShoppingCartIcon } from 'lucide-react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearch } from './HeaderSearch';
import { SelectBasic } from './basicComponents/SelectBasic';

export function Header(): React.ReactElement {
  const isLogin = true;

  return (
    <>
      <header className="p-3">
        <nav className="flex justify-between items-center gap-4">
          <HeaderLogo />

          <HeaderSearch />

          <div className="flex justify-end items-center gap-2">
            <SelectBasic
              defaultValue="en"
              options={[
                { value: 'en', label: 'EN' },
                { value: 'ru', label: 'RU' },
              ]}
            />
            <Button variant="ghost" size="icon-lg" aria-label="Корзина">
              <ShoppingCartIcon className="size-5" />
            </Button>
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
