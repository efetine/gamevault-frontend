import { getCategoriesById } from '~/helpers/categories-from-db';
import CategoriesDetail from '~/views/categories-detail/categories-detail';

interface CategoryDetailProps {
  page: number;
  category: string;
}
const categoryDetail = async ({ page, category }: CategoryDetailProps) => {
  const categories = await getCategoriesById(8, page, category);

  return (
    <div>
      <h2>CATEGORIAS POR ID</h2>
      <div>
        {categories &&
          categories.length > 0 &&
          categories.map((product) => {
            return <CategoriesDetail key={product.id} {...product} />;
          })}
      </div>
    </div>
  );
};

export default categoryDetail;
