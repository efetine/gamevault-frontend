import { z } from 'zod';

import { env } from '~/env';
import { couponSchema, type Coupon } from '~/schemas/coupons-schema';
import type { CreateCoupon } from '~/schemas/create-coupon-schema';
import type { EditCoupon } from '~/schemas/edit-coupon-schema';
import { paginatedResultSchema } from '~/schemas/paginated-result';
import { paginationDtoSchema } from '~/schemas/pagination-dto';

export const getCouponsSchema = z.array(couponSchema);

export async function createCoupon(values: CreateCoupon) {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Failed to create coupon: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in createCoupon: ${error.message}`);
  }
}

const getCouponsInputSchema = paginationDtoSchema;

type GetCouponsInput = z.infer<typeof getCouponsInputSchema>;

const paginatedCoupons = paginatedResultSchema(couponSchema);

type PaginatedCoupons = z.infer<typeof paginatedCoupons>;

export const getCoupons = async (
  input: GetCouponsInput,
): Promise<PaginatedCoupons> => {
  try {
    const { cursor, limit = '10' } = getCouponsInputSchema.parse(input);
    const url = new URL('/coupons/all', env.NEXT_PUBLIC_API_URL);

    if (cursor) {
      url.searchParams.append('cursor', cursor);
    }

    url.searchParams.append('limit', limit);

    const response = await fetch(url.toString());

    const body = await response.json();

    const parsedCoupons = paginatedCoupons.safeParse(body);

    if (parsedCoupons.success === false) {
      console.log(parsedCoupons.error);
      throw new Error(`Validation error: ${parsedCoupons.error.message}`);
    }

    return parsedCoupons.data;
  } catch (error: any) {
    throw new Error(`Error in getCoupons: ${error.message}`);
  }
};

export async function getCouponById(id: string | number): Promise<Coupon> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();

    const parsedCoupon = couponSchema.safeParse(body);

    if (!parsedCoupon.success) {
      throw new Error(parsedCoupon.error.message);
    }

    return parsedCoupon.data;
  } catch (error: any) {
    throw new Error(`Error in getCouponById: ${error.message}`);
  }
}

export async function updateCoupon(id: Coupon['id'], values: EditCoupon) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/coupons/update-discount/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update coupon: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in updateCoupon: ${error.message}`);
  }
}

export async function setInactiveCoupon(id: Coupon['id']) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/coupons/${id}/inactive`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to inactivate coupon: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in setInactiveCoupon: ${error.message}`);
  }
}

export async function deleteCoupon(id: Coupon['id']) {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete coupon: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in deleteCoupon: ${error.message}`);
  }
}

export async function changeStatus(id: Coupon['id']) {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/coupons/toggle-status/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to change coupon status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error in changeStatus: ${error.message}`);
  }
}

export async function sendCouponMail(emails: string[], coupons: Coupon[]) {
  if (emails.length !== coupons.length) {
    throw new Error(
      "The number of coupons doesn't match the number of email addresses.",
    );
  }

  for (let i = 0; i < emails.length; i++) {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/mail-test/send-coupon`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emails: [emails[i]],
            coupons: [coupons[i]],
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to send coupon to ${emails[i]}: ${response.statusText}`,
        );
      }
    } catch (error: any) {
      throw new Error(`Error in sendCouponMail: ${error.message}`);
    }
  }

  return { message: 'Coupons sent successfully!' };
}
