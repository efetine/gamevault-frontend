import { getProductsById } from "~/helpers/products-from-db";
import ProductDetail from "~/Views/product-detail/product-detail";

const Detail: React.FC<{params: {productId: string}}> =  async  ({params}) => {  
  const product = await getProductsById(params.productId)
  return (
    <ProductDetail {...product}/>
  )
};

export default Detail;