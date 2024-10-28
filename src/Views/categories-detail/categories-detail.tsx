import Link from 'next/link';
import Card from '~/components/card/card';
import { getCategoriesById } from '~/helpers/categories-from-db';
import { ICategory } from '~/interfaces/ICategory';

export interface IProductListProp {
  category: ICategory;
}
export const CategoriesDetail: React.FC<IProductListProp> = async ({ category }) => {
  const response = await getCategoriesById(8, category.name);
  const products = response.products;

  return (
    <div>
      {products &&
        products?.map((product) => {
          return (
            <Link href={`/products/category${product.id}`} key={product.id}>
              <Card
                {...product}
                // id={product.id}
                // name={product.name}
                // price={product.price}
                // category={product.category}
                // imageUrl={product.imageUrl}
                // stock={product.stock}
              />
            </Link>
          );
        })}
    </div>
  );
};

//export default CategoriesDetail;
