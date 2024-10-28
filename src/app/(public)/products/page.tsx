import { z } from 'zod';

import { paginationDtoSchema } from '~/schemas/pagination-dto';
import ProductsPage from '~/views/products/products-page';

const propsSchema = z.object({
  searchParams: paginationDtoSchema,
});

type HomePageProps = z.infer<typeof propsSchema>;

export default function HomePage(props: HomePageProps) {
  const { searchParams } = propsSchema.parse(props);

  return <ProductsPage prevCursor={searchParams.prevCursor} cursor={searchParams.cursor} />;
}
