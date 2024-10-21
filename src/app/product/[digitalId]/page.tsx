import { getProductsById } from "~/helpers/products-from-db";
import ProductDetail from "~/views/product-detail/product-detail";

const ProductDigital = async ({
  params,
}: {
  params: { digitalId: string };
}) => {
  //console.log(params.digitalId);
  const productId = await getProductsById(params.digitalId);
  return <ProductDetail {...productId} />;
};

export default ProductDigital;
