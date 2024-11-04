"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getOrders } from "~/services/orders-service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AdminOrders() {
  const { data } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) =>
      getOrders({
        cursor: pageParam,
        limit: "10",
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  const orders = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage your orders here.</p>
        </div>
      </div>
      <DataTable data={orders} columns={columns} />
    </div>
  );
}
