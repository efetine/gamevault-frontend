import { z } from 'zod';
import { productSchema } from './product-schema';

export const productsSchema = z.array(productSchema);

export type Products = z.infer<typeof productsSchema>;
