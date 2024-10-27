'use client'

import { useSearchParams } from 'next/navigation'
import CardList from "~/components/card-list/card-list";
import type { PaginationDto } from "~/schemas/pagination-dto";

type ProductsPageProps = PaginationDto;

const ProductsPage = ({ prevCursor, cursor }: ProductsPageProps) => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') ?? undefined

  return (
    <div className="w-full content-center items-center justify-center">
      <CardList prevCursor={prevCursor} cursor={cursor} type={type} />
    </div>
  );
};

export default ProductsPage;



