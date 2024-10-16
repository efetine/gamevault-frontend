import ProductDigitalDetail from "~/components/views/ProductDetail/ProductDetail";

const ProductDigital: React.FC<{ params: { digitalId: string } }> = ({
  params,
}) => {
  //console.log(params.digitalId);
  return (
    // <div>
    //   <h1>Detalle del producto digital {params.digitalId}</h1>
    // </div>
    <ProductDigitalDetail />
  );
};

export default ProductDigital;
