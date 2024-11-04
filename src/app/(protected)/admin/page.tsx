import { MessageSquare, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { CiShoppingTag } from "react-icons/ci";
import { RiCoupon2Line } from "react-icons/ri";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

export default async function Admin() {
  const session = await getServerAuthSession();

  /* if (session === null) {
    redirect("/api/auth/signin");
  } */

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-8">
      <Link href="/admin/chatbox">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Configure and monitor your virtual assistant
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/admin/orders">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Monitor and process customer orders
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/admin/coupons">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coupons</CardTitle>
            <RiCoupon2Line className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage and monitor your discount coupons.
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/admin/products">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage your product and service catalog
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/admin/categories">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <CiShoppingTag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage and organize product categories.
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
      <Link href="/admin/users">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
