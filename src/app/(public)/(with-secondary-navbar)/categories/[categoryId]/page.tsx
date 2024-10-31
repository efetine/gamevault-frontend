"use client";
import { useParams, useRouter } from "next/navigation";
import ProductsByCategory from "~/components/products/products-by-category/products-by-category";

const CategoryId = () => {
  const router = useRouter();
  const { categoryId } = useParams<{
    categoryId: string;
  }>();

  if (!categoryId) {
    router.push("/");
    return;
  }

  return <ProductsByCategory categoryId={categoryId} />;
};

export default CategoryId;
