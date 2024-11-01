"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { Loading } from "~/components/layout/loading";
import { getCategories } from "~/services/categories-service";
import { UsersTable } from "./categories-table";

export default function AdminUsers() {
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
    <UsersTable
      data={categories}
      pagesSize={data.pages.length}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
