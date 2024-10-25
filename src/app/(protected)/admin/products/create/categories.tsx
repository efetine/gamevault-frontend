"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
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

interface Category {
  id: string;
  name: string;
}

export function CategoriesCombobox() {
  const form = useFormContext();
  const [open, setOpen] = React.useState(false);

  const { data: categories, status } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/categories");
      const categories = (await response.json()) as Category[];
      return categories;
    },
  });

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  // const [categories, setCategories] = React.useState<Category[]>([]);
  // React.useEffect(() => {
  //   const fn = async () => {
  //     const response = await fetch("http://localhost:3001/categories");
  //     const categories = await response.json();
  //     setCategories(categories);
  //   };
  //   fn();
  // }, []);

  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
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
                        {category.name}
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
