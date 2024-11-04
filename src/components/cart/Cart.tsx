'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { useCart } from '~/state/cart-state';

export function Cart() {
  const { state } = useCart();

  const { data } = useQuery({
    queryKey: ['products'],
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="default"  className='hover:bg-slate-700 text-xl '>
          <ShoppingCart className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{JSON.stringify(state.products)}</PopoverContent>
    </Popover>
  );
}
