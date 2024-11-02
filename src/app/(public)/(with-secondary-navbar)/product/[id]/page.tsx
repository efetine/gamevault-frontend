'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Loading } from '~/components/layout/loading';
import { ProductDetailPage } from '~/components/products/product-detail-page';
import { getProductById } from '~/services/products-service';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>...Error</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailPage {...product} />;
}
