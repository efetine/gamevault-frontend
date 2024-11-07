"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Checkbox } from "~/components/ui/checkbox";
import { Coupon } from "~/schemas/coupons-schema";
import { EditCouponStatus } from "./edit-coupon-status";

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
    cell: ({ row }) => {
      const discountPercentage: number = row.getValue("discountPercentage");

      return <span>{discountPercentage}%</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return <EditCouponStatus coupon={row.original} />;
    },
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const expirationDate: Date = row.getValue("expirationDate");

      return <span>{format(expirationDate, "dd/MM/yyyy")}</span>;
    },
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
