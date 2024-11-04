"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getCategoryById } from "~/services/categories-service";
import { EditCategoryForm } from "./edit-category-form";

export function EditCategory() {
  const { id } = useParams<{ id: string }>();

  const { data, status } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
  });

  if (status === "error") return <div>Error</div>;

  if (status === "pending") return <div>Loading...</div>;

  return <EditCategoryForm category={data} />;
}
