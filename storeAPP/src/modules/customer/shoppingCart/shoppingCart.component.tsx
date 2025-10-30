"use client";

import { Item } from "@/@types/itens";
import { storeCustomizationsDivided } from "@/@types/store";
import { Button, QuantitySelector } from "@/components/ui";
import { formatCurrency } from "@/modules/formatters/format-currency";
import { URL_PURCHASE } from "@/constants/urls";
import { Trash } from "@phosphor-icons/react";
import Link from "next/link";

type Props = {
  total: number;
  buyShoppingCartItens: () => void;
  itens: Item[];
  catalogInfo: storeCustomizationsDivided["catalog"];
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItemFromCart: (id: string) => void;
};

export default function ShoppingCartComponent(inProps: Props) {
  const { 
    itens, 
    catalogInfo, 
    updateItemQuantity, 
    removeItemFromCart, 
    buyShoppingCartItens, 
    total 
  } = inProps;

  return (
    <div
      style={{ background: catalogInfo.backgroundColor }}
      className="min-h-screen flex flex-col p-6"
    >
      <main className="flex-1 rounded-t-xl shadow-xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Meu Carrinho</h2>

        <div
          className="flex flex-col gap-4 overflow-auto"
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {itens.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <Link href={`./${item.id}${URL_PURCHASE}`} className="flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border border-gray-300 shadow-sm"
                />
              </Link>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col">
                  <Link href={`./${item.id}${URL_PURCHASE}`}>
                    <div className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                      {item.name}
                    </div>
                  </Link>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(item.value)} cada
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Quantidade
                    </label>
                    <QuantitySelector
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => 
                        updateItemQuantity(item.id, newQuantity)
                      }
                      min={1}
                      max={99}
                    />
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-lg font-semibold text-gray-700">
                      {formatCurrency(item.value * item.quantity)}
                    </div>
                    <button 
                      onClick={() => removeItemFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remover item"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {itens.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-lg mb-4">
                Seu carrinho está vazio
              </div>
              <Link href="./store">
                <Button variant="default">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      {itens.length > 0 && (
        <footer className="py-6 px-8 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-2xl font-bold">{formatCurrency(total)}</span>
          </div>
          <Button variant="success" onClick={buyShoppingCartItens}>
            Finalizar Compra
          </Button>
        </footer>
      )}
    </div>
  );
}
