

import { getProductsById } from "~/helpers/products-from-db";
import ProductDetailView from "~/Views/product-detail/product-detail";

const ProductDetail: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const product = await getProductsById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailView {...product} />;
}

export default ProductDetail;