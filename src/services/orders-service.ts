import { z } from "zod";
import { env } from "~/env";

import { Order, orderSchema } from "~/schemas/order-schema";
import { paginatedResultSchema } from "~/schemas/paginated-result";
import { paginationDtoSchema } from "~/schemas/pagination-dto";
import { type User, userSchema } from "~/schemas/user-schema";

const getOrdersInputSchema = paginationDtoSchema;

type GetOrdersInput = z.infer<typeof getOrdersInputSchema>;

const orderWithUserSchema = orderSchema.extend({
  user: userSchema.pick({
    id: true,
    email: true,
  }),
});

export type OrderWithUser = z.infer<typeof orderWithUserSchema>;

const paginatedAdminOrders = paginatedResultSchema(orderWithUserSchema);

type PaginatedAdminOrders = z.infer<typeof paginatedAdminOrders>;

export const getOrders = async (
  input: GetOrdersInput,
): Promise<PaginatedAdminOrders> => {
  try {
    const { cursor, limit = "10" } = getOrdersInputSchema.parse(input);
    const url = new URL("/orders/findAll", env.NEXT_PUBLIC_API_URL);

    if (cursor) {
      url.searchParams.append("cursor", cursor);
    }

    url.searchParams.append("limit", limit);

    const response = await fetch(url.toString());

    const body = await response.json();

    const parsedOrders = paginatedAdminOrders.safeParse(body);

    if (parsedOrders.success === false) {
      throw new Error(`Validation error: ${parsedOrders.error.message}`);
    }

    return parsedOrders.data;
  } catch (error: any) {
    throw new Error(`Error in getOrders: ${error.message}`);
  }
};

const paginatedUserOrders = paginatedResultSchema(orderSchema);

type PaginatedUserOrders = z.infer<typeof paginatedUserOrders>;

export const getUserOrders = async (
  userId: User["id"],
  input: GetOrdersInput,
): Promise<PaginatedUserOrders> => {
  try {
    const { cursor, limit = "10" } = getOrdersInputSchema.parse(input);
    const url = new URL("/orders/findAllByUser", env.NEXT_PUBLIC_API_URL);

    if (cursor) {
      url.searchParams.append("cursor", cursor);
    }

    url.searchParams.append("limit", limit);
    url.searchParams.append("userId", userId);

    const response = await fetch(url.toString());

    const body = await response.json();

    const parsedOrders = paginatedUserOrders.safeParse(body);

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
