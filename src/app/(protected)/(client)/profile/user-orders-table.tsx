"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { DataTable } from "~/components/ui/data-table";
import type { User } from "~/schemas/user-schema";
import { getUserOrders } from "~/services/orders-service";
import { columns } from "./columns";

interface UserOrdersProps {
  userId: User["id"];
}

export function UserOrders({ userId }: UserOrdersProps) {
  const { data, status, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) =>
      getUserOrders(userId, {
        cursor: pageParam,
        limit: "10",
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  console.log({ data, status, error });

  const orders = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        </div>
      </div>
      <DataTable
        data={orders}
        columns={columns}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
