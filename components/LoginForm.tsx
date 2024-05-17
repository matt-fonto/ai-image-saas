"use client";

import { useFormErrors } from "@/hooks/useFormError";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";

type ContactFormProps = {
  className?: string;
};

export function LoginForm({ className }: ContactFormProps) {
  const { errors, setFieldError, resetErrorsAfterDelay } = useFormErrors([
    "name",
    "email",
  ]);
  const ref = useRef<HTMLFormElement>(null);

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
        // action={clientAction}
        ref={ref}
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
            required
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
            required
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
