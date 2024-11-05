'use client'

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { ModeToggle } from '~/components/layout/navbar/mode-toggle';
import { Cart } from '~/components/cart/Cart';

export function NavbarDrawer({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        aria-label="Toggle menu"
      >
        {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <div className={`fixed inset-y-0 right-0 z-30 w-64 transform bg-slate-300 p-6 transition-transform duration-300 ease-in-out dark:bg-slate-600 ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <button 
          className="absolute top-4 right-4"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <div className="mt-8 flex flex-col space-y-4">
          {children}
          <Cart />
          <ModeToggle />
        </div>
      </div>
    </>
  );
}