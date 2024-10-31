import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form, FormLabel } from "~/components/ui/form";
import { useToast } from "~/hooks/use-toast";
import { Coupon } from "~/schemas/coupons-schema";
import { changeStatus, updateCoupon } from "~/services/coupon-service";

type EditCouponProps = {
  onClose: () => void;
  coupon: Coupon;
};

const predefinedDiscounts = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const EditCoupon: React.FC<EditCouponProps> = ({ coupon, onClose }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isActive, setIsActive] = React.useState(coupon.isActive);

  const updateCouponMutation = useMutation<
    {},
    {},
    { id: string; values: Coupon }
  >({
    mutationFn: async ({ id, values }) => updateCoupon(id, values),
    onError: () => {
      toast({ title: "Failed to update coupon 😔" });
    },
    onSuccess: () => {
      toast({ title: "Coupon updated! 😊" });
      onClose();
      router.push("/admin/coupons");
    },
  });

  const changeStatusMutation = useMutation<{}, {}, { id: string }>({
    mutationFn: async ({ id }) => changeStatus(id),
    onError: () => {
      toast({ title: "Failed to change coupon status 😔" });
    },
    onSuccess: () => {
      toast({
        title: `Coupon is now ${isActive ? "inactive" : "active"}! 😊`,
      });
      setIsActive(!isActive);
    },
  });

  const form = useForm<{ discountPercentage: number }>({
    defaultValues: { discountPercentage: coupon.discountPercentage },
  });

  async function onSubmit(values: { discountPercentage: number }) {
    if (!coupon.id) {
      toast({
        title: "Error: coupon ID is missing.",
        description: "Please provide a valid coupon ID.",
      });
      return;
    }

    const updatedCoupon = {
      id: coupon.id,
      values: {
        couponCode: coupon.couponCode,
        expirationDate: coupon.expirationDate,
        isActive: isActive,
        discountPercentage: values.discountPercentage,
      },
    };

    updateCouponMutation.mutate(updatedCoupon);
  }

  function handleStatusChange() {
    if (coupon.id) {
      changeStatusMutation.mutate({ id: coupon.id });
    }
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
                          form.setValue("discountPercentage", discount)
                        }
                        checked={form.watch("discountPercentage") === discount}
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
                disabled={updateCouponMutation.status === "pending"}
                onClick={handleStatusChange}
                className={`${
                  isActive
                  ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors duration-200`}
              >
                {isActive ? "Set to Inactive" : "Set to Active"}
              </Button>

              <Button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={updateCouponMutation.status === "pending"}
                className="bg-green-500 text-white transition-colors duration-200 hover:bg-[#2ea043]"
              >
                {updateCouponMutation.status === "pending" ? (
                  <CgSpinnerTwo className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default EditCoupon;
