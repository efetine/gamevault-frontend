"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { couponSchema } from "~/schemas/coupons-schema";
import { createCoupons } from "~/services/coupon-service";

const createCouponFormSchema = couponSchema
  .pick({
    discountPercentage: true,
    expirationDate: true,
  })
  .extend({
    addEmail: z.union([z.literal(""), z.string().email()]),
    emails: z
      .array(
        z.object({
          email: z.string().email(),
        }),
      )
      .min(1),
  });

type CreateCouponForm = z.infer<typeof createCouponFormSchema>;

export default function CreateCoupon() {
  const router = useRouter();
  const { toast } = useToast();

  const createCouponMutation = useMutation<void, {}, CreateCouponForm>({
    mutationFn: async (values) => {
      const { discountPercentage, expirationDate } = values;

      const emails = values.emails.map((item) => item.email);

      return createCoupons({
        coupon: {
          discountPercentage,
          expirationDate,
        },
        emails,
      });
    },
    onError: () => {
      toast({
        title: "Failed to create coupon 😔",
      });
    },
    onSuccess: () => {
      toast({
        title: "Coupon created! 😊",
      });

      router.push("/admin/coupons");
    },
  });

  const form = useForm<CreateCouponForm>({
    resolver: zodResolver(createCouponFormSchema),
    defaultValues: {
      discountPercentage: 25,
    },
  });

  const { fields, append, remove } = useFieldArray<CreateCouponForm>({
    control: form.control,
    name: "emails",
  });

  async function onSubmit(values: CreateCouponForm) {
    createCouponMutation.mutate(values);
  }

  return (
    <div className="flex w-full items-center justify-center p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-4xl border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Create a coupon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Card className="mx-auto w-full border-2 border-dashed border-purple-500 bg-gradient-to-br from-purple-300 to-blue-300">
                <CardContent className="p-6">
                  <div className="grid h-64 grid-cols-4 gap-4">
                    <div className="col-span-3 flex flex-col justify-between">
                      <div className="text-left">
                        <span className="mr-2 text-sm font-semibold text-gray-600">
                          For:
                        </span>
                        <span className="text-lg font-medium text-purple-700">
                          john.doe@example.com
                        </span>
                      </div>

                      <div>
                        <div className="flex">
                          <p className="w-min rounded-l-lg bg-zinc-500 bg-opacity-25 px-4 py-2 text-center text-4xl font-bold text-zinc-600 shadow-inner">
                            Code
                          </p>
                          <p className="w-full rounded-r-lg bg-purple-500 bg-opacity-25 px-4 py-2 text-center text-4xl font-bold text-purple-600 shadow-inner">
                            ABC123
                          </p>
                        </div>
                        <p className="mt-2 text-left text-xs text-zinc-500">
                          *This is an example, final result will be a generated
                          code.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <FormField
                          control={form.control}
                          name="expirationDate"
                          render={({ field }) => (
                            <FormItem className="flex gap-2">
                              <FormLabel className="self-end text-sm font-semibold text-gray-600">
                                Expiration Date:
                              </FormLabel>
                              <div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] border-purple-500 bg-transparent pl-3 text-left font-bold text-purple-500 hover:bg-opacity-50",
                                          !field.value &&
                                            "text-muted-foreground",
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage className="text-red-500" />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="col-span-1 flex items-center justify-center border-l-2 border-dashed border-purple-500 pl-6">
                      <FormField
                        control={form.control}
                        name="discountPercentage"
                        render={({ field }) => (
                          <FormItem className="relative text-red-500">
                            <FormLabel className="absolute right-0 top-0 text-center text-xl">
                              % OFF
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                step={1}
                                {...field}
                                className="h-32 border-none text-center text-7xl font-extrabold shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="pt-4">
                <FormField
                  control={form.control}
                  name="addEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emails to send the coupon:</FormLabel>
                      <div className="flex gap-4">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={() => {
                            if (field.value !== "") {
                              const emailExists = fields.find(
                                (item) => item.email === field.value,
                              );

                              if (emailExists !== undefined) {
                                toast({
                                  title:
                                    "Email already added, choose another one.",
                                });
                                return;
                              }

                              append({ email: field.value });
                              field.onChange("");
                            }
                          }}
                        >
                          Add email
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                      <FormItem className="my-2">
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              {...form.register(`emails.${index}.email`)}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500"
                          >
                            <X className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => router.push("/admin/coupons")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createCouponMutation.status === "pending"}
              >
                {createCouponMutation.status === "pending" ? (
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
