import { EditCategory } from '~/components/categories/edit-category';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export default function EditCategoryPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Update category</CardTitle>
          <CardDescription>
            Update the fields below to edit the category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditCategory />
        </CardContent>
      </Card>
    </div>
  );
}
