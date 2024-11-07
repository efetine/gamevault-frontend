"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";

import { CategoriesCombobox } from "~/components/admin/categories/categories";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import {
  createProductSchema,
  type CreateProduct,
} from "~/schemas/create-product-schema";
import type { Product } from "~/schemas/product-schema";
import { createProduct, uploadImage } from "~/services/products-service";

export default function CreateProduct() {
  const router = useRouter();
  const { toast } = useToast();

  const createProductMutation = useMutation<Product, {}, CreateProduct>({
    mutationFn: async (data) => {
      const { imageUrl, ...rest } = data;
      const product = await createProduct(rest);

      await uploadImage(product.id, imageUrl);

      return product;
    },
    onError: () => {
      toast({
        title: "Failed to create product 😔",
      });
    },
  });

  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      type: "digital",
      stock: 0,
      price: 0,
      description: "",
    },
  });

  async function onSubmit(values: CreateProduct) {
    await createProductMutation.mutateAsync(values);

    toast({
      title: "Product created! 😊",
    });

    router.push("/admin/products");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-8 w-full max-w-md"
        >
          <Card className="border border-[#30363d] bg-[#0d1117]/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Create a Product
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">Name</FormLabel>
                    <FormControl>
                      <Input
                        type=""
                        placeholder=""
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>

                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Select the type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="digital" />
                          </FormControl>
                          <FormLabel className="font-normal">Digital</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="physical" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Physical
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end gap-2 space-y-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          className="border-[#30363d] bg-[#1a2332]/60 text-end text-white placeholder:text-gray-400"
                        />
                      </FormControl>

                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-100">Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          className="border-[#30363d] bg-[#1a2332]/60 text-end text-white placeholder:text-gray-400"
                        />
                      </FormControl>

                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Image"
                        type="file"
                        accept="image/*"
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
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
                    <FormLabel className="text-gray-100">Description</FormLabel>
                    <FormControl>
                      <Input
                        type=""
                        placeholder=""
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <CategoriesCombobox />
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Link href={"/admin/products"}>
                <Button
                  variant="secondary"
                  className="transition-colors duration-200"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={createProductMutation.status === "pending"}
                className="bg-green-500 text-white transition-colors duration-200 hover:bg-[#2ea043]"
              >
                {createProductMutation.status === "pending" ? (
                  <CgSpinnerTwo className="animate-spin" />
                ) : null}
                Create
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
