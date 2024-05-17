"use client";

import { createUser } from "@/actions/createUser";
import { useFormErrors } from "@/hooks/useFormError";
import { cn } from "@/lib/utils";
import { SignUpSchema, SignUpType } from "@/schemas/SignUpSchema";
import Link from "next/link";
import { useRef } from "react";
import { useFormState } from "react-dom";

type ContactFormProps = {
  className?: string;
  propertyTitle?: string;
  propertyLink?: string;
  source?: string;
};

const TIMER_RESET_ERRORS = 4000;

export function SignUpForm({
  source,
  className,
  propertyLink,
  propertyTitle,
}: ContactFormProps) {
  const [state, formAction] = useFormState(createUser, null);
  const { errors, setFieldError, resetErrorsAfterDelay } = useFormErrors([
    "name",
    "email",
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

    if (state === "success") {
      ref.current?.reset();
    }
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
            required
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
            required
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
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
            required
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
