"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { getCategories } from "~/services/categories-service";

export function CategoriesCombobox() {
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  const { data, status } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      getCategories({
        limit: "10",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  const categories = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Category</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {field.value
                  ? categories.find((category) => category.id === field.value)
                      ?.name
                  : "Select category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.id}
                        onSelect={() => {
                          form.setValue("categoryId", category.id);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === category.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <span className="first-letter:uppercase">
                          {category.name}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
