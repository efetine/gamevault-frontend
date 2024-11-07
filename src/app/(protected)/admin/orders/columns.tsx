"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";
// import { DataTableColumnHeader } from "./data-table-column-header";
import { format } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { OrderWithUser } from "~/services/orders-service";
import { EditShippingStatus } from "./edit-shipping-status";

export const columns: ColumnDef<OrderWithUser>[] = [
  {
    accessorKey: "id",
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "email",
    accessorFn: (row) => row.user.email,
    header: "Email",
  },
  {
    accessorKey: "orderEstatus",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
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
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");

      return format(new Date(date), "HH:mm MM/dd/yyyy");
    },
  },
  {
    accessorKey: "shippingStatus",
    header: "Shipping Status",
    cell: ({ row }) => {
      return <EditShippingStatus order={row.original} />;
    },
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
  },
];
