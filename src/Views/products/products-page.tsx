import CardList from '~/components/card-list/card-list';
import type { ProductsViewProps } from '~/interfaces/IProductsViewProps';

const ProductsPage = ({ page }: ProductsViewProps) => {
  return (
    <div className='max-w-[1120px] w-full m-auto justify-center items-center content-center'>
      <CardList page={page} />
    </div>
  );
};

export default ProductsPage;
