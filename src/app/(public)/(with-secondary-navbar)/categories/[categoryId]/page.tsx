"use client";
import { useParams, useRouter } from "next/navigation";
import CardListByCategory from "~/components/products/categories-detail/categories-detail";

const CategoryId = () => {
  const router = useRouter();
  const { categoryId } = useParams<{
    categoryId: string;
  }>();

  if (!categoryId) {
    router.push("/");
    return;
  }

  return <CardListByCategory categoryId={categoryId} />;
};

export default CategoryId;
