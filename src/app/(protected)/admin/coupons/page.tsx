"use client";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { toast } from "~/hooks/use-toast";
import { Coupon } from "~/schemas/coupons-schema";
import { getCoupons, sendCouponMail } from "~/services/coupon-service";
// import { columns } from './columns';
// import { DataTable } from './data-table';

export default function CouponsPage() {
  const { data } = useInfiniteQuery({
    queryKey: ["coupons"],
    queryFn: () =>
      getCoupons({
        cursor: "",
        limit: "10",
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  const coupons = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  const sendCouponsMutation = useMutation<
    {},
    {},
    { emails: string[]; coupons: Coupon[] }
  >({
    mutationFn: async ({ emails, coupons }) => {
      return await sendCouponMail(emails, coupons);
    },
    onError: () => {
      toast({
        title: "Ocurrió un error al enviar los cupones. Intenta nuevamente. 😔",
      });
    },
    onSuccess: () => {
      toast({
        title: "Cupones enviados exitosamente a los correos proporcionados. 😊",
      });
    },
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">Manage your coupons here.</p>
        </div>
      </div>
      {/* <DataTable data={coupons} columns={columns} /> */}
    </div>
  );
}
