"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { getOrderById } from "~/services/orders-service";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, status } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => getOrderById({ id: Number(id) }),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16">
      <Card className="mx-auto h-full w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Video Game Order Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Order ID</TableCell>
                  <TableCell>{data.id}</TableCell>
                </TableRow>
                {data.ordersDetails.map((orderDetail) => (
                  <Fragment key={orderDetail.id}>
                    <TableRow>
                      <TableCell className="font-medium">Game Name</TableCell>
                      <TableCell>{orderDetail.product.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Product Price
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(orderDetail.price)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Quantity</TableCell>
                      <TableCell>{orderDetail.quantity}</TableCell>
                    </TableRow>
                  </Fragment>
                ))}
                <TableRow>
                  <TableCell className="font-medium">Total</TableCell>
                  <TableCell className="text-lg font-bold">
                    ${data.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Order Status:</span>
            <Badge>{data.orderEstatus.toLocaleUpperCase()}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Shipping Status:</span>
            <span>{data.shippingStatus}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Shipping Address:</span>
            <span>{data.shippingAddress}</span>
          </div>
          <div className="flex w-full flex-1 justify-end">
            <Link href={"/admin/orders"}>
              <Button>Back</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
