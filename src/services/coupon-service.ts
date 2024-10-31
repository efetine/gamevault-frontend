import { z } from "zod";

import { env } from "~/env";
import { Coupon } from "~/schemas/coupons-schema";
import { CreateCoupon } from "~/schemas/create-coupon-schema";
import { EditCoupon } from "~/schemas/edit-coupon-schema";

export async function createCoupon(values: CreateCoupon) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await response.json();
}


export const couponSchema = z.object({
  couponCode: z.string(),
  discountPercentage: z.number(),
  expirationDate: z.string(),
  id: z.string(),
  isActive: z.boolean(),
});

export const getCouponsSchema = z.array(couponSchema);

export const paginationDtoSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type PaginationDto = z.infer<typeof paginationDtoSchema>;

export const getCoupons = async () => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/all`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Error al obtener cupones: " + response.statusText);
  }

  return getCouponsSchema.parse(data);
};

export async function getCouponById(id: string | number): Promise<Coupon> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();

  const parsedCoupon = couponSchema.safeParse(body);

  if (parsedCoupon.success === false) {
    throw new Error(parsedCoupon.error.message);
  }

  return parsedCoupon.data;
}

export async function updateCoupon(id: Coupon["id"], values: EditCoupon) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/coupons/update-discount/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    },
  );

  const result = await response.json();

  return result;
}

export async function setInactiveCoupon(id: Coupon["id"]) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/coupons/${id}/inactive`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error inactivating coupon");
  }

  const result = await response.json();
  return result;
}

export async function deleteCoupon(id: Coupon["id"]) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting coupon");
  }

  const result = await response.json();
  return result;
}

export async function changeStatus(id: Coupon["id"]) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/coupons/status/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error changing coupon status");
  }

  const result = await response.json();
  return result;
}
