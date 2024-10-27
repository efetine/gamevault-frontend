'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type ProductTypeSelectorProps = {
  initialType?: string;
  onTypeChange: (type: string | undefined) => void;
};

export default function ProductTypeSelector({ initialType, onTypeChange }: ProductTypeSelectorProps) {
  const [productType, setProductType] = useState<string | undefined>(initialType);
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    setProductType(type ?? undefined);
  }, [searchParams]);

  const handleTypeChange = (type: string | undefined) => {
    setProductType(type);
    onTypeChange(type);
  };

  return (
    <div className="w-full mb-4 flex justify-center space-x-4">
      <button
        onClick={() => handleTypeChange(undefined)}
        className={`px-4 py-2 rounded ${productType === undefined ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center shadow-lg text-white' : 'bg-gray-400'}`}
      >
        All Products
      </button>
      <button
        onClick={() => handleTypeChange('digital')}
        className={`px-4 py-2 rounded ${productType === 'digital' ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center shadow-lg text-white' : 'bg-gray-400'}`}
      >
        Digital Products
      </button>
      <button
        onClick={() => handleTypeChange('physical')}
        className={`px-4 py-2 rounded ${productType === 'physical' ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-purple-900/60 p-8 text-center shadow-lg text-white' : 'bg-gray-400'}`}
      >
        Physical Products
      </button>
    </div>
  );
}
