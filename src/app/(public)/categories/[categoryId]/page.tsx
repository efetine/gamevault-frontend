'use client';
import { useParams } from 'next/navigation';
import CategoriesDetail from '~/views/categories-detail/categories-detail';

const CategoryId: React.FC<{ params: { categoryId: string } }> = async ({ params }) => {
  const { categoryId } = useParams() as {
    categoryId: string;
  };

  return <CategoriesDetail categoryId={categoryId} />;
};

export default CategoryId;
