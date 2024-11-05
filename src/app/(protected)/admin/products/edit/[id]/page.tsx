'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { z } from 'zod';

import { getProductById } from '~/services/products-service';
import ProductEditForm from './product-edit-form';

const paramsSchema = z.object({
  id: z.string(),
});

export default function ProductsEdits() {
  const params = useParams();
  const parsedParams = paramsSchema.safeParse(params);

  if (parsedParams.success === false) {
    notFound();
  }

  const { id } = parsedParams.data;

  const { data, status } = useQuery({
    queryKey: ['edit-product', id],
    queryFn: () => getProductById(id),
  });

  if (status === 'error') {
    notFound();
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  return <ProductEditForm product={data} />;
}
