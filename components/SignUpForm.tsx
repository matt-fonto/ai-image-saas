"use client";

import { createUser } from "@/actions/user.actions";
import { useFormErrors } from "@/hooks/useFormError";
import { cn } from "@/lib/utils";
import { SignUpSchema, SignUpType } from "@/schemas/signup.schema";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { FcGoogle } from "react-icons/fc";

type ContactFormProps = {
  className?: string;
};

export function SignUpForm({ className }: ContactFormProps) {
  const [state, formAction] = useFormState(createUser, null);
  const { errors, setFieldError, resetErrorsAfterDelay } = useFormErrors([
    "username",
    "email",
    "password",
    "confirmPassword",
  ]);
  const ref = useRef<HTMLFormElement>(null);

  function clientAction(formData: FormData) {
    const newUser: SignUpType = {
      username: String(formData.get("username")),
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      confirmPassword: String(formData.get("confirmPassword")),
    };

    const { error, data } = SignUpSchema.safeParse(newUser);

    if (error) {
      error.issues.forEach((issue) => setFieldError(issue));
      resetErrorsAfterDelay();
    }

    if (!data) {
      return;
    }

    formAction(data);

    redirect("/login");
  }

  return (
    <div
      className={cn(
        className,
        "min-h-screen flex items-center justify-center bg-gray-100 p-4"
      )}
    >
      <form
        id="contact-form"
        method="POST"
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
        action={clientAction}
        ref={ref}
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up
        </button>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <Link
          href={"/api/auth/signin/google"}
          className="flex items-center justify-center w-full bg-white border gap-x-2 border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FcGoogle className="text-2xl" />
          Sign up with Google
        </Link>

        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
