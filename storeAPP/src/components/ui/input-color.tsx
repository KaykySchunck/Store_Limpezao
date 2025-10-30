"use client";

import * as React from "react";
import { Spinner } from "@phosphor-icons/react";
import ReactInputColor from "react-input-color"; // Importa o componente para seleção de cor
import { cn } from "@/lib/utils";

export interface ColorInputProps {
  value?: string; // Valor da cor (em formato hex ou rgba)
  onChange?: (color: string) => void; // Função para atualizar a cor selecionada
  label?: string; // Rótulo do campo
  labelClassName?: string; // Classe do rótulo
  containerClassName?: string; // Classe do contêiner
  loading?: boolean; // Indicador de carregamento
  disabled?: boolean; // Habilitar ou desabilitar o campo
}

const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      value,
      onChange,
      label,
      labelClassName,
      containerClassName,
      loading,
      disabled,
    },
    ref
  ) => {
    const [color, setColor] = React.useState<string>(value ?? "#000000"); // Estado para o valor da cor

    // Função para lidar com a mudança de cor
    const handleChangeColor = (newColor: any) => {
      setColor(newColor.hex); // Atualiza o estado local com a cor selecionada
      if (onChange) {
        onChange(newColor.hex); // Chama a função onChange passada para atualizar o valor no componente pai
      }
    };

    return (
      <div className={cn("mb-4", containerClassName)}>
        {label && (
          <label
            htmlFor="color-input"
            className={cn(
              "block text-sm font-medium text-gray-700",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative mt-1">
          <ReactInputColor
            initialValue={color} // Usando 'color' em vez de 'initialColor'
            onChange={handleChangeColor} // Atualiza a cor no estado
            disabled={disabled || loading}
            placement="bottom"
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

ColorInput.displayName = "ColorInput";

export { ColorInput };
