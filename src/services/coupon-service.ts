import { z } from 'zod';
import { env } from '~/env';
import { Coupon } from '~/schemas/coupons-schema';
import { CreateCoupon } from '~/schemas/create-coupon-schema';
import { EditCoupon } from '~/schemas/edit-coupon-schema';

export const couponSchema = z.object({
  couponCode: z.string(),
  discountPercentage: z.number(),
  expirationDate: z.string(),
  id: z.string(),
  isActive: z.boolean(),
});
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

export const getCoupons = async () => {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/coupons/all`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch coupons: ${response.statusText}`);
    }

    return getCouponsSchema.parse(data);
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
