import Link from "next/link";

import { EditCategory } from "~/components/categories/edit-category";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function EditUser() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <EditCategory />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/admin/users">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
