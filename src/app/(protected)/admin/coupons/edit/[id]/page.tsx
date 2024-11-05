'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CgSpinnerTwo } from 'react-icons/cg';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Form, FormLabel } from '~/components/ui/form';
import { useToast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import type { EditCoupon } from '~/schemas/edit-coupon-schema';
import {
  changeStatus,
  getCouponById,
  updateCoupon,
} from '~/services/coupon-service';

const predefinedDiscounts = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function EditCoupon() {
  const router = useRouter();
  const { toast } = useToast();

  const { id } = useParams<{ id: string }>();
  const couponId = id;

  const {
    data: coupon,
    status,
    error,
  } = useQuery({
    queryKey: ['coupon', couponId],
    queryFn: async () => getCouponById(couponId),
  });

  const updateCouponMutation = useMutation<
    {},
    {},
    { id: string; values: EditCoupon }
  >({
    mutationFn: async ({ id, values }) => updateCoupon(id, values),
    onError: () => {
      toast({ title: 'Failed to update coupon 😔' });
    },
    onSuccess: () => {
      toast({ title: 'Coupon updated! 😊' });
      router.push('/admin/coupons');
    },
  });

  const changeStatusMutation = useMutation<{}, {}, { id: string }>({
    mutationFn: async ({ id }) => changeStatus(id),
    onError: () => {
      toast({ title: 'Failed to change coupon status 😔' });
    },
    onSuccess: () => {
      toast({
        title: `Coupon is now ${coupon?.isActive ? 'inactive' : 'active'}! 😊`,
      });
    },
  });

  const form = useForm<{ discountPercentage: number }>({
    // defaultValues: { discountPercentage: coupon.discountPercentage },
  });

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  async function onSubmit(values: { discountPercentage: number }) {
    if (!coupon) {
      return;
    }

    const { id, ...rest } = coupon;

    const updatedCoupon = {
      id,
      values: {
        ...rest,
        discountPercentage: values.discountPercentage,
      },
    };

    updateCouponMutation.mutate(updatedCoupon);
  }

  function handleStatusChange(couponId: string) {
    changeStatusMutation.mutate({ id: couponId });
  }

  return (
    <div className="fixed left-1/2 top-12 z-50 w-full max-w-md -translate-x-1/2 transform bg-[#0d1117]/80 p-6 shadow-lg backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border border-[#30363d] bg-[#0d1117]/80 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Edit Coupons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mt-4">
                <FormLabel className="text-gray-100">
                  Preset Discounts
                </FormLabel>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {predefinedDiscounts.map((discount) => (
                    <label
                      key={discount}
                      className="flex items-center space-x-2 rounded-lg bg-[#1a2332]/80 p-2 transition-colors duration-200 hover:bg-[#30363d]"
                    >
                      <input
                        type="checkbox"
                        value={discount}
                        onChange={() =>
                          form.setValue('discountPercentage', discount)
                        }
                        checked={form.watch('discountPercentage') === discount}
                        className="form-checkbox h-5 w-5 rounded border-gray-500 text-green-500 focus:ring focus:ring-green-400 focus:ring-opacity-50"
                      />
                      <span className="text-white">{discount}%</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                type="button"
                disabled={updateCouponMutation.status === 'pending'}
                onClick={() => handleStatusChange(coupon.id)}
                className={cn(
                  coupon.isActive
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-blue-500 hover:bg-blue-600',
                  'text-white transition-colors duration-200',
                )}
              >
                {coupon.isActive ? 'Set to Inactive' : 'Set to Active'}
              </Button>

              <Link href="/admin/coupons">
                <Button
                  type="button"
                  className="bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
                >
                  Close
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={updateCouponMutation.status === 'pending'}
                className="bg-green-500 text-white transition-colors duration-200 hover:bg-[#2ea043]"
              >
                {updateCouponMutation.status === 'pending' ? (
                  <CgSpinnerTwo className="animate-spin" />
                ) : (
                  'Update'
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
