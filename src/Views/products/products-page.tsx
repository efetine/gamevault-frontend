import CardList from "~/components/card-list/card-list";
import type { PaginationDto } from "~/schemas/pagination-dto";

type ProductsPageProps = PaginationDto;

const ProductsPage = ({ prevCursor, cursor }: ProductsPageProps) => {
  return (
    <div className="w-full content-center items-center justify-center">
      <CardList prevCursor={prevCursor} cursor={cursor} />
    </div>
  );
};

export default ProductsPage;
