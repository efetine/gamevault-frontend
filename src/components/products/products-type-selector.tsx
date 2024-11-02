'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductTypeSelector() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();

  const handleTypeChange = (type?: 'digital' | 'physical') => {
    if (type === undefined) {
      router.push('/products');
      return;
    }

    router.push(`/products?type=${type}`);
  };

  return (
    <div className="mb-4 flex w-full justify-center space-x-4">
      <button
        onClick={() => handleTypeChange(undefined)}
        className={`rounded px-4 py-2 ${type === null ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-fuchsia-950/60 p-8 text-center text-white shadow-lg' : 'bg-gray-400 hover:bg-gray-500'}`}
      >
        All Products
      </button>
      <button
        onClick={() => handleTypeChange('digital')}
        className={`rounded px-4 py-2 ${type === 'digital' ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-fuchsia-950/60 p-8 text-center text-white shadow-lg' : 'bg-gray-400 hover:bg-gray-500'}`}
      >
        Digital Products
      </button>
      <button
        onClick={() => handleTypeChange('physical')}
        className={`rounded px-4 py-2 ${type === 'physical' ? 'bg-gradient-to-r from-blue-900/60 via-indigo-950 to-fuchsia-950/60 p-8 text-center text-white shadow-lg' : 'bg-gray-400 hover:bg-gray-500'}`}
      >
        Physical Products
      </button>
    </div>
  );
}
