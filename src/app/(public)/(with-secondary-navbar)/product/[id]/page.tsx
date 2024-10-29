import { ProductDetailPage } from "~/components/products/product-detail-page";
import { getProductById } from "~/services/products-service";

const ProductDetail: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailPage {...product} />;
};

export default ProductDetail;
