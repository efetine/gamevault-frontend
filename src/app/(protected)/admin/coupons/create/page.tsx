'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/hooks/use-toast';
import { couponSchema, type Coupon } from '~/schemas/coupons-schema';
import { createCoupon } from '~/services/coupon-service';

export default function CreateCoupon() {
  const router = useRouter();
  const { toast } = useToast();

  const createCouponMutation = useMutation<{}, {}, Coupon>({
    mutationFn: async (values) => createCoupon(values),
    onError: () => {
      toast({
        title: 'Failed to create coupon 😔',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Coupon created! 😊',
      });

      router.push('/admin/coupons');
    },
  });

  const form = useForm<Coupon>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      couponCode: '',
      discountPercentage: 0,
      expirationDate: '',
      isActive: true,
    },
  });

  async function onSubmit(values: Coupon) {
    createCouponMutation.mutate(values);
  }

  return (
    <div className="fixed left-1/2 top-12 z-50 w-full max-w-md -translate-x-1/2 transform bg-[#0d1117]/80 p-6 shadow-lg backdrop-blur-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border border-[#30363d] bg-[#0d1117]/80 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Create a Coupon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <FormField
                control={form.control}
                name="couponCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">Coupon Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">
                      Discount (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-end text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">
                      Expiration Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="YYYY/MM/DD"
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                type="button"
                onClick={() => router.push('/admin/coupons')}
                className="bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={createCouponMutation.status === 'pending'}
                className="bg-green-500 text-white transition-colors duration-200 hover:bg-[#2ea043]"
              >
                {createCouponMutation.status === 'pending' ? (
                  <CgSpinnerTwo className="animate-spin" />
                ) : null}
                Create
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
