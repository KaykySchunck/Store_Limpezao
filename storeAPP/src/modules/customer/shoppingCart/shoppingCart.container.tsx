import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";
import ShoppingCartComponent from "./shoppingCart.component";
import { Item } from "@/@types/itens";
import { formatCurrency } from "@/modules/formatters/format-currency";
import { useState, useEffect } from "react";

export default function ShoppingCartContainer() {
  const { catalogInfo } = useStoreCustomizationsContext();
  const [itens, setItens] = useState<any[]>([]);

  // Carrega os itens do carrinho do localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setItens(cartItems);
  }, []);

  function updateItemQuantity(id: string, newQuantity: number) {
    const updatedCart = itens.map((item: any) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setItens(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function removeItemFromCart(id: string) {
    const updatedCart = itens.filter((item: any) => item.id !== id);
    setItens(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function buyShoppingCartItens() {
    if (itens.length === 0) {
      console.log("🛒 Seu carrinho está vazio!");
      return;
    }

    try {
      const formattedItems = itens
        .map(
          (item: any) =>
            `🛍️ *${item.name}*\n💰 *Preço:* R$ ${formatCurrency(
              item.value
            )}\n📦 *Quantidade:* ${item.quantity}`
        )
        .join("\n\n");

      const message = `Olá! \n\nQuero finalizar minha compra com os seguintes itens:\n\n${formattedItems}\n\n💵 *Total:* R$ ${formatCurrency(
        total
      )}\n\n Por favor, me ajude a concluir esse pedido!`;

      const whatsappURL = `https://wa.me/5519993787066?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappURL, "_blank");
    } catch (error) {
      console.error("❌ Erro ao processar os itens do carrinho:", error);
    }
  }

  const total = itens.reduce(
    (sum: number, item: { value: number; quantity: number }) =>
      sum + item.value * item.quantity,
    0
  );

  return (
    <ShoppingCartComponent
      total={total}
      buyShoppingCartItens={buyShoppingCartItens}
      updateItemQuantity={updateItemQuantity}
      removeItemFromCart={removeItemFromCart}
      catalogInfo={catalogInfo}
      itens={itens}
    />
  );
}
