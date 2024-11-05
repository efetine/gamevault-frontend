"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

import { Loading } from "~/components/layout/loading";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { getCoupons } from "~/services/coupon-service";
import { columns } from "./columns";

export default function CouponsPage() {
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  if (status === "error") {
    return <div>Cannot show categories</div>;
  }

  if (status === "pending") {
    return <Loading />;
  }

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
        filterBy="couponCode"
        renderActions={
          <Link href="/admin/coupons/create">
            <Button>Send cuopons</Button>
          </Link>
        }
      />
    </div>
  );
}
