import { z } from "zod";

import { productSchema } from "./product-schema";

export const productDetailPropsSchema = productSchema.extend({
  authToken: z.string().optional(),
});

export type ProductDetailPageProps = z.infer<typeof productDetailPropsSchema>;
