"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

import { Loading } from "~/components/layout/loading";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { getCategories } from "~/services/categories-service";
import { columns } from "./columns";

export default function AdminCategories() {
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam }) =>
      getCategories({
        cursor: pageParam,
        limit: "10",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const categories = useMemo(() => {
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
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage your categories here.</p>
        </div>
      </div>
      <DataTable
        data={categories}
        columns={columns}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        filterBy="name"
        renderActions={
          <Link href="/admin/categories/create">
            <Button>Add Categories</Button>
          </Link>
        }
      />
    </div>
  );
}
