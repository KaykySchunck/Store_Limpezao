"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

const QuantitySelector = React.forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      quantity,
      onQuantityChange,
      min = 1,
      max = 99,
      className,
      disabled = false,
    },
    ref
  ) => {
    const handleDecrease = () => {
      if (!disabled && quantity > min) {
        onQuantityChange(quantity - 1);
      }
    };

    const handleIncrease = () => {
      if (!disabled && quantity < max) {
        onQuantityChange(quantity + 1);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);
      if (!isNaN(value) && value >= min && value <= max) {
        onQuantityChange(value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center border border-gray-300 rounded-md", className)}
      >
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || quantity <= min}
          className={cn(
            "px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            "border-r border-gray-300 rounded-l-md"
          )}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-16 text-center border-none outline-none px-2 py-2 bg-white focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled || quantity >= max}
          className={cn(
            "px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            "border-l border-gray-300 rounded-r-md"
          )}
        >
          +
        </button>
      </div>
    );
  }
);

QuantitySelector.displayName = "QuantitySelector";

export { QuantitySelector }; 