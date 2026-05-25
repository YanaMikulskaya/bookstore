import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import {
  clearCartLS,
  clearCartServer,
  fetchCart,
  fetchCartLS,
  toggleCart,
  toggleCartLS,
  updateCartQuantityLS,
  updateCartQuantityServer,
} from '@/redux/cart-slice';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Trash2Icon, MinusIcon, PlusIcon, ShoppingBagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ButtonGroup } from '@/components/ui/button-group';
import { SkeletonCart } from './SkeletonCart';
import type { CartState } from '@/types';

export function Cart(): React.ReactElement {
  const { cart, cartItems, totalQuantity, cartError, cartLoading } =
    useAppSelector((state): CartState => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => !!state.auth.jwt);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCart());
    } else {
      dispatch(fetchCartLS());
    }
  }, [isAuth, cartItems, dispatch]);

  // Изменение количества
  const handleQuantityChange = (id: number, quantity: number) => {
    if (isAuth) {
      dispatch(updateCartQuantityServer({ id, quantity }));
    } else {
      dispatch(updateCartQuantityLS({ id, quantity }));
    }
  };

  // Удаление товара
  const handleRemoveItem = (id: number) => {
    if (isAuth) {
      dispatch(toggleCart(id));
    } else {
      dispatch(toggleCartLS(id));
    }
  };

  // Количество товаров
  const totalSum = useMemo(() => {
    return cart.reduce((sum, book) => {
      const price = book ? parseFloat(book.price as unknown as string) : 0;
      return sum + price * book.quantity;
    }, 0);
  }, [cart]);

  // Очистка корзины
  const handleClearCart = () => {
    if (confirm('Вы уверены, что хотите очистить всю корзину?')) {
      if (isAuth) {
        dispatch(clearCartServer());
      } else {
        dispatch(clearCartLS());
      }
    }
  };

  const handleCheckout = () => {
    console.log('Переход к оформлению заказа', { cartItems, totalSum });
  };

  if (cartItems.length === 0 || cartError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBagIcon className="size-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">
          {cartError ? 'Неудалось загрузить корзину' : 'Корзина пуста'}
        </h2>
        <p className="text-muted-foreground">
          Добавьте товары в корзину, чтобы продолжить
        </p>
        <Button
          onClick={() => {
            navigate('/books/all/1');
          }}
        >
          Перейти в каталог
        </Button>
      </div>
    );
  }

  if (cartLoading) {
    return <SkeletonCart />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Список товаров */}
      <div className="flex-1 space-y-4">
        {cart.map((book) => {
          if (!book) return null;
          const numericPrice = parseFloat(book.price);

          return (
            <div key={book.id} className="flex flex-col sm:flex-row gap-4 p-4 ">
              {/* Карточка товара */}
              <div className="sm:w-48 shrink-0 flex-1">
                <BookCard variant="cart" data={book} />
              </div>

              {/* Управление количеством и удаление */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-1 ml-auto">
                  <ButtonGroup>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      disabled={book.quantity === 1}
                      onClick={() =>
                        handleQuantityChange(book.id, book.quantity - 1)
                      }
                    >
                      <MinusIcon className="size-3" />
                    </Button>
                    <Input
                      type="number"
                      value={book.quantity}
                      min="1"
                      max="10"
                      onChange={(e) => {
                        const value = Math.min(
                          10,
                          Math.max(1, parseInt(e.target.value) || 1),
                        );
                        handleQuantityChange(book.id, value);
                      }}
                      className="w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-8"
                    />
                    <Button
                      type="button"
                      size="icon"
                      disabled={book.quantity === 10}
                      variant="outline"
                      onClick={() =>
                        handleQuantityChange(book.id, book.quantity + 1)
                      }
                    >
                      <PlusIcon className="size-3" />
                    </Button>
                  </ButtonGroup>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveItem(book.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>

                <div className="text-right mt-auto ml-auto">
                  <span className="text-sm text-muted-foreground">Сумма:</span>
                  <p className="text-lg font-semibold">
                    {(numericPrice * book.quantity).toFixed(2)} руб.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Блок итого */}
      <div className="lg:w-80">
        <div className="bg-card rounded-lg border p-6 sticky top-20">
          <h2 className="text-lg font-semibold mb-4">Итого</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Товаров:</span>
              <span>{totalQuantity} шт.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сумма:</span>
              <span>{totalSum.toFixed(2)} руб.</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Всего к оплате:</span>
                <span className="text-primary">{totalSum.toFixed(2)} руб.</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={handleClearCart}
            disabled={cart.length === 0}
          >
            <Trash2Icon className="size-4 mr-2" />
            Очистить корзину
          </Button>
          <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
            Перейти к оформлению
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Доставка рассчитывается при оформлении заказа
          </p>
        </div>
      </div>
    </div>
  );
}
