"use client";

import { useMutation } from "@tanstack/react-query";
import { Badge } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Order } from "~/schemas/order-schema";
import { editOrderShippingStatus } from "~/services/orders-service";

type EditShippingStatusProps = {
  order: Pick<Order, "id" | "shippingStatus">;
};

export function EditShippingStatus({ order }: EditShippingStatusProps) {
  const updateShippingStatusMutation = useMutation<
    unknown,
    unknown,
    Pick<Order, "id" | "shippingStatus">
  >({
    mutationFn: (data) => editOrderShippingStatus(data),
  });

  if (order.shippingStatus === "none") {
    return <Badge>None</Badge>;
  }

  return (
    <Select
      defaultValue={order.shippingStatus}
      onValueChange={(shippingStatus: Order["shippingStatus"]) => {
        updateShippingStatusMutation.mutate({ id: order.id, shippingStatus });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={order.shippingStatus}>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
