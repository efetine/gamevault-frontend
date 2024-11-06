import { ProductDetailPage } from "~/components/products/product-detail-page";
import { getProductById } from "~/services/products-service";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailPage {...product} />;
};

export default ProductDetail;
