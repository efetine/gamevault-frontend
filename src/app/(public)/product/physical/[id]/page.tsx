import { getProductsById } from "~/helpers/products-from-db";
import ProductDetail from "~/Views/product-detail/product-detail";

const PhysicalProductDetail: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const product = await getProductsById(params.id);
  return (
    <ProductDetail {...product} />
  );
};

export default PhysicalProductDetail;