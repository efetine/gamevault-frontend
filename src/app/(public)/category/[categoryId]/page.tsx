import { getCategoriesById } from '~/helpers/categories-from-db';
import { CategoriesDetail } from '~/views/categories-detail/categories-detail';

const CategoryId: React.FC<{ params: { categoryId: string } }> = async ({ params }) => {
  const category = await getCategoriesById(Number(params.categoryId));
  // const category = await getCategoriesById(Number('tools'));
  // console.log(category, 'category');
  return <CategoriesDetail category={category} />;
};

export default CategoryId;
