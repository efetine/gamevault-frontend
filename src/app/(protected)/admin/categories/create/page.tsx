import { CreateCategory } from "~/components/categories/create-category";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function CreateCategoryPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a category</CardTitle>
          <CardDescription>
            Complete the fields below to create a new category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCategory />
        </CardContent>
      </Card>
    </div>
  );
}
