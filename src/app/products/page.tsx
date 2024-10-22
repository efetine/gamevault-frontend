import ProductsPage from '~/views/products/products-page';

export default function Products({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return <ProductsPage page={Number(searchParams.page ?? 1)} />;
}
