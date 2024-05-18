"use client";

import { useFormErrors } from "@/hooks/useFormError";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas/LoginSchema";

type ContactFormProps = {
  className?: string;
};

export function LoginForm({ className }: ContactFormProps) {
  const { errors, setFieldError, resetErrorsAfterDelay } = useFormErrors([
    "login",
    "password",
  ]);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (ref.current) {
      const formData = new FormData(ref.current);
      const login = formData.get("login");
      const password = formData.get("password");

      const { error, data } = LoginSchema.safeParse({
        login: String(login),
        password: String(password),
      });

      if (error) {
        error.issues.forEach((issue) => setFieldError(issue));
        resetErrorsAfterDelay();
      }

      if (!data) {
        return;
      }

      await signIn("credentials", {
        login,
        password,
        redirect: false,
      });

      router.push("/dashboard");
    }
  };

  return (
    <div
      className={cn(
        className,
        "min-h-screen flex items-center justify-center bg-gray-100 p-4"
      )}
    >
      <form
        id="login-form"
        method="POST"
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
        ref={ref}
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {/* Username or Email */}
        <div>
          <label
            htmlFor="login"
            className="block text-sm font-medium text-gray-700"
          >
            Username or Email
          </label>
          <input
            type="text"
            name="login"
            id="login"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.login && (
            <p className="mt-1 text-sm text-red-600">{errors.login}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <Link
          href={"/api/auth/signin/google"}
          className="flex items-center justify-center w-full bg-white border gap-x-2 border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </Link>

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
