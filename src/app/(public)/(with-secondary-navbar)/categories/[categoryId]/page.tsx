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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black">
      <div className="container mx-auto px-4 pt-24 md:pt-36">
        <ProductsByCategory categoryId={categoryId} />
      </div>
    </div>
  );
};

export default CategoryId;
