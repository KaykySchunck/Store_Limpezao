"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-blue-700 hover:bg-blue-600 text-white",
  light: "bg-blue-50 hover:bg-blue-100 text-blue",
  outline: "border border-blue-700 text-blue-700 hover:bg-blue-100",
  success: "bg-green-600 hover:bg-green-700 text-white",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      children,
      disabled,
      loading = false,
      ...props
    },
    ref
  ) => {
    const variantClass = buttonVariants[variant];

    return (
      <button
        type="button"
        className={cn(
          "w-full p-3 font-bold rounded-lg transition-colors",
          variantClass,
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <div>Carregando...</div> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
