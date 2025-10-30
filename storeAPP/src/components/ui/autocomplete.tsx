"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner, CaretDown } from "@phosphor-icons/react";

export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  options: { label: string; value: string }[];
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string; // Torna `value` opcional
  onValueChange: (value: string) => void;
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      label,
      labelClassName,
      containerClassName,
      className,
      value = "",
      onValueChange,
      loading,
      disabled,
      placeholder = "Selecione uma opção",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      onValueChange(inputValue);

      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);

      // Abrir o dropdown se houver opções filtradas
      setIsOpen(filtered.length > 0);
    };

    const handleOptionClick = (option: { label: string; value: string }) => {
      onValueChange(option.value);
      setIsOpen(false);
    };

    React.useEffect(() => {
      setFilteredOptions(options);
    }, [options]);

    // Fecha o dropdown ao clicar fora
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn("relative mb-4", containerClassName)}
      >
        {label && (
          <label
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
            ref={ref}
            type="text"
            value={value} // Controlado com fallback garantido
            placeholder={placeholder}
            disabled={disabled || loading}
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
              className
            )}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)} // Abre o dropdown ao focar
            onBlur={() => setTimeout(() => setIsOpen(false), 150)} // Fecha após um pequeno delay
            {...props}
          />
          {!loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <CaretDown size={16} />
            </div>
          )}
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner size={20} className="animate-spin fill-blue-700" />
            </div>
          )}
        </div>
        {isOpen && filteredOptions.length > 0 && (
          <ul
            className={cn(
              `
                absolute 
                z-10 
                mt-1
                w-full 
                max-h-48 
                overflow-auto 
                rounded-lg 
                border 
                border-gray-300 
                bg-white 
                shadow-lg
              `
            )}
          >
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  `
                    px-4 
                    py-2 
                    text-sm 
                    text-gray-700 
                    cursor-pointer 
                    hover:bg-blue-100
                  `
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {isOpen && filteredOptions.length === 0 && !loading && (
          <div
            className={cn(
              `
                absolute 
                z-10 
                mt-1 
                w-full 
                rounded-lg 
                border 
                border-gray-300 
                bg-white 
                py-2 
                text-center 
                text-sm 
                text-gray-500
              `
            )}
          >
            Nenhuma opção encontrada.
          </div>
        )}
      </div>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

export { Autocomplete };
