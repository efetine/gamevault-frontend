"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Category } from "~/schemas/category-schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
