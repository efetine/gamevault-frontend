"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { Order } from "~/schemas/order-schema";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");

      return format(new Date(date), "HH:mm MM/dd/yyyy");
    },
  },
  {
    accessorKey: "orderEstatus",
    header: "Status",
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
    cell: ({ row }) => {
      const payment: boolean = row.getValue("isPaid");

      return (
        <Badge
          variant="outline"
          className={cn(payment === true ? "bg-green-700" : "bg-red-700")}
        >
          <span className="first-letter:uppercase">
            {payment === true ? "Payment" : "Unpaid"}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
