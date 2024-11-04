// "use client";

// import { useInfiniteQuery } from "@tanstack/react-query";

// import { useMemo } from "react";
// import { Loading } from "~/components/layout/loading";
// import { getProducts } from "~/services/products-service";
// import { ProductsTable } from "./products-table";

// export default function AdminProducts() {
//   const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
//     queryKey: ["products"],
//     queryFn: ({ pageParam }) =>
//       getProducts({
//         cursor: pageParam,
//       }),
//     initialPageParam: "",
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });

//   const products = useMemo(() => {
//     if (!data) return [];

//     return data.pages.flatMap((page) => page.data);
//   }, [data]);

//   if (status === "error") {
//     return <div>Cannot show products</div>;
//   }

//   if (status === "pending") {
//     return <Loading />;
//   }

//   return (
//     <ProductsTable
//       data={products}
//       pagesSize={data.pages.length}
//       hasNextPage={hasNextPage}
//       fetchNextPage={fetchNextPage}
//     />
//   );
// }

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { Loading } from "~/components/layout/loading";
import { getProducts } from "~/services/products-service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AdminProducts() {
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      getProducts({
        cursor: pageParam,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const products = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (status === "error") {
    return <div>Cannot show products</div>;
  }

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your products here.</p>
        </div>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
