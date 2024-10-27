import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ProductNotFound() {
  return (
    <Card className="m-auto max-h-96 w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Product not found</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          We're sorry, we couldn't find the product you're looking for. Please
          try a different search or explore our other categories.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/admin/products">
          <Button>Return to products</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
