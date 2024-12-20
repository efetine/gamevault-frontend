"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { DataTable } from "~/components/ui/data-table";
import { getUsers } from "~/services/users-service";
import { columns } from "./columns";

export default function AdminUsers() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) =>
      getUsers({
        cursor: pageParam,
        limit: "10",
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  const users = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage your users here.</p>
        </div>
      </div>
      <DataTable
        data={users}
        columns={columns}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        filterBy="email"
      />
    </div>
  );
}
