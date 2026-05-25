import { ToggleBasic } from './basicComponents/ToggleBasic';
import { HeartIcon } from 'lucide-react';
import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleFavorites, toggleFavoritesLS } from '@/redux/favorites-slice';
import type { CartItemModel } from '@/types';
import { toggleCart, toggleCartLS } from '@/redux/cart-slice';
type BookActionsProps = {
  forSmall?: boolean;
  forLarge?: boolean;
  id: number;
};

export function BookActions({
  forSmall,
  forLarge,
  id,
}: BookActionsProps): React.ReactElement {
  const isFavorite = useAppSelector((state) =>
    state.favorites.favoritesIds.includes(id),
  );

  const isInCart = useAppSelector((state) =>
    state.cart.cartItems.some((item: CartItemModel) => item.book_id === id),
  );

  const jwt = useAppSelector((state) => state.auth.jwt);
  const isAuth = useMemo(() => !!jwt, [jwt]);

  const dispatch = useAppDispatch();

  const handleCartToggle = useCallback(() => {
    if (isAuth) {
      dispatch(toggleCart(id));
    } else {
      dispatch(toggleCartLS(id));
    }
  }, [isInCart]);

  const handleFavoriteToggle = useCallback(() => {
    const action = isFavorite ? 'remove' : 'add';

    if (isAuth) {
      dispatch(toggleFavorites({ id, act: action }));
    } else {
      dispatch(toggleFavoritesLS(id));
    }
  }, [isAuth, isFavorite, id, dispatch]);

  return (
    <div
      className={
        forLarge
          ? 'flex flex-col gap-3'
          : 'flex gap-1 justify-between mt-auto w-full'
      }
    >
      <ToggleBasic
        variant="accent"
        size={forSmall ? 'sm' : 'default'}
        className={forSmall ? 'text-xs h-7 px-2' : ''}
        text="В корзину"
        activeText="В корзине"
        isActive={isInCart}
        onToggle={handleCartToggle}
      />
      <ToggleBasic
        icon={<HeartIcon className="size-5" />}
        size={forSmall ? 'sm' : 'default'}
        className={forSmall ? 'text-xs h-7 px-2' : ''}
        text={forSmall ? undefined : 'Избранное'}
        activeText={forSmall ? undefined : 'В избранном'}
        defaultActive={false}
        isActive={isFavorite}
        onToggle={handleFavoriteToggle}
      />
    </div>
  );
}
