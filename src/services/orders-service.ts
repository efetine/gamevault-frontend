import { z } from "zod";
import { env } from "~/env";

import { Order, orderSchema } from "~/schemas/order-schema";
import { paginatedResultSchema } from "~/schemas/paginated-result";
import { paginationDtoSchema } from "~/schemas/pagination-dto";
import { userSchema } from "~/schemas/user-schema";

const getOrdersInputSchema = paginationDtoSchema;

type GetOrdersInput = z.infer<typeof getOrdersInputSchema>;

const orderWithUserSchema = orderSchema.extend({
  user: userSchema.pick({
    id: true,
    email: true,
  }),
});

export type OrderWithUser = z.infer<typeof orderWithUserSchema>;

const paginatedOrders = paginatedResultSchema(orderWithUserSchema);

type PaginatedOrders = z.infer<typeof paginatedOrders>;

export const getOrders = async (
  input: GetOrdersInput,
): Promise<PaginatedOrders> => {
  try {
    const { cursor, limit = "10" } = getOrdersInputSchema.parse(input);
    const url = new URL("/orders/findAll", env.NEXT_PUBLIC_API_URL);

    if (cursor) {
      url.searchParams.append("cursor", cursor);
    }

    url.searchParams.append("limit", limit);

    const response = await fetch(url.toString());

    const body = await response.json();

    const parsedOrders = paginatedOrders.safeParse(body);

    if (parsedOrders.success === false) {
      throw new Error(`Validation error: ${parsedOrders.error.message}`);
    }

    return parsedOrders.data;
  } catch (error: any) {
    throw new Error(`Error in getOrders: ${error.message}`);
  }
};

export function editOrderShippingStatus({
  id,
  shippingStatus,
}: Pick<Order, "id" | "shippingStatus">) {
  return fetch(`${env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shippingStatus }),
  });
}
