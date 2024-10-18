import Link from 'next/link';
import CategoryCard from '~/components/category-card/category-card';
import { getProductsByCategory } from '~/helpers/categories-from-db';

const Categories = async () => {
  const categoriesAll = await getProductsByCategory();
  return (
    <div>
      <h1>Categories All</h1>
      <div>
        {categoriesAll &&
          categoriesAll.length > 0 &&
          categoriesAll?.map((category) => {
            return (
              <Link href={`/category/${category.id}`} key={category.id}>
                <CategoryCard {...category} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
