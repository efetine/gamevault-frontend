import { z } from "zod";
import { cartPayloadArraySchema } from "./cart-payload-schema";

export const cartQuerySchema = z.object({
  data: cartPayloadArraySchema,
  nextCursor: z.number().nullable(),
});

export type CartQuerySchema = z.infer<typeof cartQuerySchema>;
