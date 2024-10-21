"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Register() {
  const searchParams = useSearchParams();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: "",
    },
  });

  function onSubmit(values: FormSchema) {
    signIn("credentials", {
      callbackUrl: "/",
      ...values,
    });
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-8 w-full max-w-md"
        >
          <Card className="border border-[#30363d] bg-[#0d1117]/80 shadow-lg backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Login
              </CardTitle>
              <CardDescription className="text-gray-300">
                Login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      enter your email
                    </FormDescription>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="border-[#30363d] bg-[#1a2332]/60 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      enter your password
                    </FormDescription>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                type="submit"
                className="bg-[#238636] text-white transition-colors duration-200 hover:bg-[#2ea043]"
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
