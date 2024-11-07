"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { ProductWithCategory } from "~/schemas/product-schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={row.getValue("imageUrl")}
          width="64"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          <span className="first-letter:uppercase">{row.getValue("type")}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("active");
      return (
        <Badge
          variant="outline"
          className={cn(status === "active" ? "bg-green-700" : "bg-red-700")}
        >
          <span className="first-letter:uppercase">{status}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.getValue("price"))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
