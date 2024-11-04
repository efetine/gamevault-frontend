"use client";

import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { couponSchema, type Coupon } from "~/schemas/coupons-schema";
import { updateCouponStatus } from "~/services/coupon-service";

const editCouponSchema = couponSchema.pick({ isActive: true });

type EditCoupon = z.infer<typeof editCouponSchema>;

type EditCouponStatusProps = {
  coupon: Coupon;
};

export function EditCouponStatus({ coupon }: EditCouponStatusProps) {
  const updateCouponStatusMutation = useMutation<unknown, unknown, EditCoupon>({
    mutationFn: (data) => updateCouponStatus(coupon.id, data),
  });

  return (
    <Select
      defaultValue={coupon.isActive ? "active" : "inactive"}
      onValueChange={(value) => {
        updateCouponStatusMutation.mutate({ isActive: value === "active" });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={coupon.isActive ? "active" : "inactive"}>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
