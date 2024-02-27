"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, SVGProps, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpWithEmailAndPassword } from "../actions";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(5, "Mínimo 5 caracteres"),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await signUpWithEmailAndPassword(values);
    if ("error" in response) {
      signUpForm.setError("email", {
        type: "server",
        message: response.error,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (signUpForm.formState.isSubmitSuccessful) {
      router.push("/streaming");
    }
  }, [signUpForm.formState.isSubmitSuccessful, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex justify-center">
          <a href="/">
            <FlagIcon />
          </a>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Crea una cuenta
        </h2>
        <Form {...signUpForm}>
          <form
            className="mt-8 space-y-6"
            onSubmit={signUpForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isLoading}>
              Continuar{" "}
              {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-600">
              <Link
                className="font-medium text-blue-600 hover:text-blue-500"
                href="/auth/login"
              >
                Iniciar sesión
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

function FlagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e71e63"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 21h10" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
    </svg>
  );
}

function Spinner(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
