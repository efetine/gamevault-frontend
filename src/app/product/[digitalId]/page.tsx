import { getProductsById } from "~/helpers/products-from-db";
import ProductDetail from "~/Views/product-detail/product-detail";

const ProductDigital = async ({
  params,
}: {
  params: { digitalId: string };
}) => {
  //console.log(params.digitalId);
  const productId = await getProductsById(params.digitalId);
  return (
    // <div>
    //   <h1>Detalle del producto digital {params.digitalId}</h1>
    // </div>
    <ProductDetail {...productId} />
  );
};

export default ProductDigital;
