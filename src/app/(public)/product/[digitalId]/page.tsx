import ProductDigitalDetail from '~/views/product-detail/product-detail';

const ProductDigital: React.FC<{ params: { digitalId: string } }> = ({ params }) => {
  return <ProductDigitalDetail />;
};

export default ProductDigital;
