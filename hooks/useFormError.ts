import { useState } from "react";
import { ZodIssue } from "zod";

const TIMER_RESET_ERRORS = 4000;

type ErrorType = { [key: string]: string | null };

export function useFormErrors(fields: string[]) {
  const initalErrors = fields.reduce((acc, field) => {
    acc[field] = null;
    return acc;
  }, {} as ErrorType);

  const [errors, setErrors] = useState<ErrorType>(initalErrors);

  function setFieldError(issue: ZodIssue) {
    const path = issue.path[0] as unknown as string;

    if (fields.includes(path)) {
      setErrors((prev) => ({ ...prev, [path]: issue.message }));
    }
  }

  function cleanErrors() {
    setErrors(initalErrors);
  }

  function resetErrorsAfterDelay() {
    setTimeout(() => {
      cleanErrors();
    }, TIMER_RESET_ERRORS);
  }

  return { errors, setFieldError, cleanErrors, resetErrorsAfterDelay };
}
