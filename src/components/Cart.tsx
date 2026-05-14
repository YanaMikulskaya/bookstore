import { useState, useMemo } from 'react';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Trash2Icon, MinusIcon, PlusIcon, ShoppingBagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ButtonGroup } from '@/components/ui/button-group'; // путь к вашему компоненту
import type { CartItem, BookModel } from '@/types';

type CartProps = {
  initialCartItems: CartItem[];
  data: BookModel[];
};

export function Cart({
  initialCartItems,
  data,
}: CartProps): React.ReactElement {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Получение книги по id
  const getBookById = (id: number) => {
    return data.find((book) => book.id === id);
  };

  // Изменение количества
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Удаление товара
  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Подсчёт общей суммы
  const totalSum = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const book = getBookById(item.id);
      const price = book ? parseFloat(book.price as unknown as string) : 0;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  // Количество товаров
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    console.log('Переход к оформлению заказа', { cartItems, totalSum });
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBagIcon className="size-16 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Корзина пуста</h2>
        <p className="text-muted-foreground">
          Добавьте товары в корзину, чтобы продолжить
        </p>
        <Button asChild>
          <a href="/catalog">Перейти в каталог</a>
        </Button>
      </div>
    );
  }

  return (
    //<div className="container mx-auto px-4 py-8">

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Список товаров */}
      <div className="flex-1 space-y-4">
        {cartItems.map((item) => {
          const book = getBookById(item.id);
          if (!book) return null;

          const numericPrice = parseFloat(book.price);

          return (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 ">
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
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <MinusIcon className="size-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value) || 1,
                        )
                      }
                      className="w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-8"
                      min={1}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
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
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>

                <div className="text-right mt-auto ml-auto">
                  <span className="text-sm text-muted-foreground">Сумма:</span>
                  <p className="text-lg font-semibold">
                    {(numericPrice * item.quantity).toFixed(2)} руб.
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
              <span>{totalItems} шт.</span>
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
