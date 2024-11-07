"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { EditUserForm, editUserFormSchema } from "~/schemas/edit-user-schema";
import {
  editPassword,
  getUserById,
  updateUserForm,
  uploadImage,
} from "~/services/users-service";

type UserEditFormProps = {
  userid: string | undefined;
};

export default function UserEditForm({ userid }: UserEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ["edit-user", userid],
    queryFn: () => getUserById(userid!),
  });

  const updateMutation = useMutation<unknown, unknown, Partial<EditUserForm>>({
    mutationKey: ["update-user", data?.id],
    mutationFn: async (data) => {
      await updateUserForm(id, data);

      if (data.profileImage instanceof File) {
        await uploadImage(id, data.profileImage);
      }

      if (data.newPassword) {
        await editPassword(id, {
          newPassword: data.newPassword,
          oldPassword: data.oldPassword,
        });
      }

      return Promise.resolve();
    },
    onError: () => {
      toast({
        title: "Failed to update user 😔",
      });
    },
  });

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: { ...data },
  });

  async function onSubmit(values: Partial<EditUserForm>) {
    const result = await updateMutation.mutateAsync(values);

    toast({
      title: "User updated!",
    });

    queryClient.invalidateQueries({
      queryKey: ["users"],
    });

    form.reset();

    router.push("/profile");
  }

  const renderPreview = (value: File | string) => {
    let src = null;

    if (typeof value === "string") {
      src = value;
    } else {
      const blob = new Blob([value], { type: value.type });

      src = URL.createObjectURL(blob);
    }
    return (
      <FormItem className="flex flex-col items-center justify-center">
        <FormLabel>Preview</FormLabel>
        <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
          <img src={src} />
        </div>
      </FormItem>
    );
  };

  if (status === "pending") return <p>Loading...</p>;
  if (!data) return <p>User not found.</p>;

  let id: string;

  if (data) {
    id = data.id;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Editing Profile
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="/profile">
                  <Button variant="secondary">Cancel</Button>
                </Link>
                <Button type="submit">
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="oldPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmNewPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Image</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormField
                        control={form.control}
                        name="profileImage"
                        render={({
                          field: { value, onChange, ...fieldProps },
                        }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...fieldProps}
                                placeholder="Image"
                                type="file"
                                accept="image/*"
                                className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                                onChange={(event) =>
                                  onChange(
                                    event.target.files && event.target.files[0],
                                  )
                                }
                              />
                            </FormControl>
                            {value && renderPreview(value)}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}
