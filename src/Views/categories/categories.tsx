import Link from 'next/link';
import CategoryCard from '~/components/category-card/category-card';
import { getCategories } from '~/helpers/categories-from-db';

const CategoriesList = async () => {
  const categoriesAll = await getCategories();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Categories All</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {categoriesAll &&
          categoriesAll.length > 0 &&
          categoriesAll?.map((categoryId) => {
            return (
              <Link
                href={`/products/category/${categoryId.id}`}
                key={categoryId.id}
                className='text-blue-600 hover:underline'
              >
                <CategoryCard {...categoryId} products={[]} />
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

export default CategoriesList;
