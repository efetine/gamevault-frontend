"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";
// import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Coupon } from "~/schemas/coupons-schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Coupon>[] = [
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
    accessorKey: "couponCode",
    header: "Code",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const status: boolean = row.getValue("isActive");

      return (
        <Badge
          variant="outline"
          className={cn(status === true ? "bg-green-700" : "bg-red-700")}
        >
          <span className="first-letter:uppercase">
            {status === true ? "Active" : "Inactive"}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
