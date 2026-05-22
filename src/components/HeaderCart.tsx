import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export function HeaderCart(): React.ReactElement {
  const count = 10;
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        aria-label="Корзина"
        className="relative mr-5"
        onClick={() => navigate('/cart')}
      >
        <ShoppingCartIcon className="size-5" />
        <Badge className="absolute text-[10px] px-1 py-0.5 -top-2 left-5 z-30">
          {count}
        </Badge>
      </Button>
    </>
  );
}
