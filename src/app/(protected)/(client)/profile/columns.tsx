"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
            {payment === true ? "PAID" : "UNPAID"}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "shippingStatus",
    header: "Shipping Status",
    cell: ({ row }) => {
      const shippingStatus: string = row.getValue("shippingStatus");
      return <Badge>{shippingStatus.toLocaleUpperCase()}</Badge>;
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/profile/orders/${row.original.id}`}>
        <Button>View details</Button>
      </Link>
    ),
  },
];
