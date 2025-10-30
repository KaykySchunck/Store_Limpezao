"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { WarningCircle } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Label } from "./Label";

const fieldsetVariants = cva("group relative w-full items-center");

type FieldProps = {
  label?: string;
  error?: string;
  optional?: boolean;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

const Field = React.forwardRef<
  HTMLFieldSetElement,
  FieldProps & VariantProps<typeof fieldsetVariants>
>(({ className, children, label, error, optional, ...props }, ref) => {
  const labelContent = (
    <>
      <div className="flex items-center gap-1">
        {label}
        {optional && <span>(opcional)</span>}
      </div>
    </>
  );

  return (
    <fieldset
      ref={ref}
      className={cn(fieldsetVariants(), className, {
        "group-invalid": error,
      })}
      aria-invalid={!!error}
      {...props}
    >
      {label && (
        <Label className="bg-background absolute -top-2 px-3 text-gray-700 z-10">
          {labelContent}
        </Label>
      )}
      {children}

      {error && (
        <div className="inline-flex items-center gap-1.5 mt-1.5">
          <WarningCircle size={20} className="fill-red-400" />
          <small className="text-xs text-red-500 font-normal">{error}</small>
        </div>
      )}
    </fieldset>
  );
});
Field.displayName = "Field";

export { Field };
