"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";
// import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { Order } from "~/schemas/order-schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Order>[] = [
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
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
