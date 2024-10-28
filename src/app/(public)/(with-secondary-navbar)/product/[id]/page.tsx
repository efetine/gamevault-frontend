import { getProductById } from "~/services/products-service";
import ProductDetailView from "~/Views/product-detail/product-detail";

const ProductDetail: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailView {...product} />;
};

export default ProductDetail;
