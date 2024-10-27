"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { CategoriesCombobox } from "~/components/admin/categories/categories";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import {
  editProductSchema,
  type EditProduct,
} from "~/schemas/edit-product-schema";
import type { Product } from "~/schemas/product-schema";
import { updateProduct } from "~/services/products-service";

type ProductEditFormProps = {
  product: Product;
};

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation<Product["id"], unknown, EditProduct>({
    mutationKey: ["update-product", product.id],
    mutationFn: (data) => updateProduct(product.id, data),
    onError: () => {
      toast({
        title: "Failed to update product 😔",
      });
    },
    onSuccess: () => {
      toast({
        title: "Product updated!",
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push("/admin/products");
    },
  });

  const form = useForm<EditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: product,
  });

  // 2. Define a submit handler.
  function onSubmit(values: EditProduct) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    updateMutation.mutate(values);
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setPreviewImage(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Editing Product
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="/admin/products">
                  <Button variant="secondary">Cancel</Button>
                </Link>
                <Button type="submit">Save</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-3">
                        <CategoriesCombobox />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="digital">
                                    Digital
                                  </SelectItem>
                                  <SelectItem value="physical">
                                    Physical
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              field.value === true ? "active" : "inactive"
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Image</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagen</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-2">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    document
                                      .getElementById("image-upload")
                                      ?.click()
                                  }
                                  variant="outline"
                                >
                                  Choose image
                                </Button>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  // {...field}
                                  // onChange={(e) => {
                                  //   field.onChange(e.target.files);
                                  //   handleFileChange(e);
                                  // }}
                                />
                                {/* {field.value && field.value[0] ? (
                                  <span className="text-sm text-gray-500">
                                    Archivo seleccionado: {field.value[0].name}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray-500">
                                    Ningún archivo seleccionado
                                  </span>
                                )} */}
                                {field.value && (
                                  <FormItem>
                                    <FormLabel>Vista previa</FormLabel>
                                    <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                                      <img src={field.value} />
                                    </div>
                                  </FormItem>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}
