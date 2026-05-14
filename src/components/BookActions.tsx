import { ToggleBasic } from './basicComponents/ToggleBasic';
import { HeartIcon } from 'lucide-react';
import { useState, useCallback } from 'react';

type BookActionsProps = {
  forSmall?: boolean;
  forLarge?: boolean;
};

export function BookActions({
  forSmall,
  forLarge,
}: BookActionsProps): React.ReactElement {
  const [isInCart, setIsInCart] = useState(false);

  const handleCartToggle = useCallback(() => {
    setIsInCart((prev) => !prev);
    console.log(!isInCart ? 'в корзине' : 'удалено из корзины');
  }, [isInCart]);

  const handleFavoriteToggle = useCallback((isActive: boolean) => {
    console.log('Избранное:', isActive);
  }, []);

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
        text={forSmall ? undefined : 'В избранное'}
        activeText={forSmall ? undefined : 'Избранное'}
        defaultActive={false}
        onToggle={handleFavoriteToggle}
      />
    </div>
  );
}
