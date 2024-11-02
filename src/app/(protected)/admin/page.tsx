import { getServerAuthSession } from '~/server/auth';

import { MessageSquare, Package, ShoppingCart, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default async function Admin() {
  const session = await getServerAuthSession();

  /* if (session === null) {
    redirect("/api/auth/signin");
  } */

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-8">
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
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription>Monitor and process customer orders</CardDescription>
        </CardContent>
      </Card>
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
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chat box</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription>
            Configure and monitor your virtual assistant
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
