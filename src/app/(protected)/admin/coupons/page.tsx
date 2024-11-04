"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getCoupons } from "~/services/coupon-service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function CouponsPage() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["coupons"],
    queryFn: ({ pageParam }) =>
      getCoupons({
        cursor: pageParam,
        limit: "10",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const coupons = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">Manage your coupons here.</p>
        </div>
      </div>
      <DataTable
        data={coupons}
        columns={columns}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
