import { Cart } from '@/components/Cart';
import { Title } from '@/components/Title';
import { initialCartItems, data } from '@/components/data';

export function CartPage() {
  return (
    <>
      <Title>Корзина</Title>
      <Cart initialCartItems={initialCartItems} data={data} />
    </>
  );
}
