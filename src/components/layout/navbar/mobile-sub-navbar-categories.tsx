'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CategoriesMenu } from '~/components/categories/categories-menu';

export function MobileCategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-transparent py-2 text-lg font-semibold text-[#dad9dc]"
      >
        Categories
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-2">
          <CategoriesMenu />
        </div>
      )}
    </div>
  );
}