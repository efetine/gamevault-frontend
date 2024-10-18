"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { env } from "~/env";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Register() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormSchema) {
    const { confirmPassword, ...rest } = values;

    fetch(`${env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md m-8"
        >
          <Card className="bg-[#0d1117]/80 border border-[#30363d] shadow-lg backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-100">
                Register
              </CardTitle>
              <CardDescription className="text-gray-300">
                Create a new account
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
                        className="bg-[#1a2332]/60 border-[#30363d] text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      Add your email.
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
                        className="bg-[#1a2332]/60 border-[#30363d] text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      Create your password.
                    </FormDescription>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-100">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        className="bg-[#1a2332]/60 border-[#30363d] text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-300">
                      Confirm your password.
                    </FormDescription>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                type="submit"
                className="bg-[#238636] hover:bg-[#2ea043] text-white transition-colors duration-200"
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
