"use client";

import * as React from "react";
import { toPattern } from "vanilla-masker";
import { cn } from "@/lib/utils";
import { Spinner } from "@phosphor-icons/react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string[];
  loading?: boolean;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function unMask(value: string | null): string {
  if (!value) return "";
  return value.replace(/\W/g, "");
}

function applyMask(patterns: string | string[], value?: any) {
  if (!value) return "";
  if (typeof patterns === "string") {
    return toPattern(value, patterns);
  }

  return toPattern(
    value,
    patterns.reduce(
      (memo: string, pattern: string) =>
        value.length <= unMask(memo).length ? memo : pattern,
      patterns[0]
    )
  );
}

function isMaskFilled(patterns: string[], value: string) {
  const maskLength = Math.max(...patterns.map((pattern) => pattern.length));
  return value.length > maskLength;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      labelClassName,
      type,
      value,
      mask,
      onChange,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        const value = event.target.value;
        if (mask && isMaskFilled(mask, value.trim())) return;

        onChange({
          ...event,
          target: {
            ...event.target,
            value: mask ? unMask(value) : value,
          },
        });
      }
    }

    // Ensure value is always controlled and valid
    const safeValue = value ?? "";
    const maskedValue = mask ? applyMask(mask, safeValue) : safeValue;

    return (
      <div className={cn("mb-4", containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium text-gray-700",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative mt-1">
          <input
            type={type}
            className={cn(
              `
                w-full 
                rounded-lg 
                border 
                border-gray-300 
                p-3 
                text-sm 
                placeholder-gray-400 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
                disabled:cursor-not-allowed 
                disabled:opacity-50
              `,
              className,
              {
                "pr-10": loading,
              }
            )}
            ref={ref}
            disabled={disabled || loading}
            value={maskedValue} // Controlled value
            onChange={handleChange}
            {...props}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner size={20} className="animate-spin fill-blue-700" />
              <p>carregando</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
