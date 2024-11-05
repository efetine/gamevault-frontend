'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { toast } from '~/hooks/use-toast';
import type { Category } from '~/schemas/category-schema';
import {
  CreateCategory,
  createCategorySchema,
} from '~/schemas/create-category-schema';
import { updateCategory } from '~/services/categories-service';

interface EditCategoryFormProps {
  category: Category;
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const router = useRouter();

  const createCategoryMutation = useMutation<Category, unknown, CreateCategory>(
    {
      mutationFn: (data) => updateCategory(category.id, data),
    },
  );

  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: category,
  });

  async function onSubmit(data: CreateCategory) {
    try {
      await createCategoryMutation.mutateAsync(data);

      toast({
        title: 'Category updated!',
      });

      router.replace('/admin/categories');
    } catch {
      toast({
        title: 'Error creating category',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="FPS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Link href="/admin/categories">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  );
}
