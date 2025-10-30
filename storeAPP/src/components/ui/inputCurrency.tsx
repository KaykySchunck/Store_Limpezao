"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@phosphor-icons/react";

export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export function formatCurrency(value: number | string): string {
  const numericValue =
    typeof value === "string" ? parseFloat(value.replace(/\D/g, "")) : value;
  if (isNaN(numericValue)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue / 100); // Dividir por 100 para lidar com centavos
}

export function parseCurrency(value: string): string {
  // Remover tudo, exceto os números e a vírgula/ponto decimal
  return value.replace(/[^\d,.-]/g, "").replace(",", ".");
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  (
    {
      className,
      containerClassName,
      label,
      labelClassName,
      value,
      onChange,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    const [rawValue, setRawValue] = React.useState(value ?? "");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const rawValue = event.target.value;
      const parsedValue = parseCurrency(rawValue);

      setRawValue(rawValue);

      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: parsedValue, // Valor sem formatação
          },
        });
      }
    }

    // Garantir que rawValue seja um valor numérico ou uma string
    const safeRawValue =
      typeof rawValue === "string" || typeof rawValue === "number"
        ? rawValue
        : "";

    // Formatar o valor para exibição
    const formattedValue = formatCurrency(safeRawValue);

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
            type="text"
            className={cn(
              `w-full rounded-lg border border-gray-300 p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`,
              className,
              {
                "pr-10": loading, // Se estiver carregando, adicionar padding para o spinner
              }
            )}
            ref={ref}
            disabled={disabled || loading}
            value={formattedValue} // Valor formatado para exibição
            onChange={handleChange} // Atualizar valor ao digitar
            {...props}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner size={20} className="animate-spin fill-blue-700" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
