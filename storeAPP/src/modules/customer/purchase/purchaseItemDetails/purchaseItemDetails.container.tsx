import { useEffect, useState } from "react";
import PurchaseItemDetailsComponent from "./purchaseItemDetails.component";
import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";
import toast from "react-hot-toast";
import { getItemWithImagesByIdService } from "@/services/itens.service";

interface PurchaseItemDetailsContainerProps {
  itemId: string | undefined;
}

export default function PurchaseItemDetailsContainer({
  itemId,
}: PurchaseItemDetailsContainerProps) {
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<any>(null); // Estado para armazenar o item e suas imagens
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const { catalogInfo, headerInfo } = useStoreCustomizationsContext();

  // Busca o item e suas imagens pelo ID
  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;

      try {
        setLoading(true);
        const data = await getItemWithImagesByIdService(itemId); // Usa o novo serviço
        setItem(data.itemWithImages || null); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        console.error("Erro ao buscar o item:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  // Adiciona o item ao carrinho
  const addItemToCart = () => {
    if (!item) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const itemIndex = cart.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      // Se o item já existe no carrinho, adiciona a quantidade selecionada
      cart[itemIndex].quantity += quantity;
    } else {
      // Se o item não existe, adiciona com a quantidade selecionada
      cart.push({
        id: item.id,
        name: item.name,
        value: item.value,
        quantity: quantity,
        img: item.images[0].url,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${item.name} foi adicionado ao carrinho!`);
  };

  // Compra o item via WhatsApp
  const buyItemToWhatsApp = () => {
    if (!item) return;

    const message = `Olá! Gostaria de comprar o item: ${encodeURIComponent(
      item.name
    )}`;

    const whatsappURL = `https://wa.me/5519993787066?text=${message}`;

    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!item) {
    return <div>Item não encontrado</div>;
  }

  return (
    <PurchaseItemDetailsComponent
      headerInfo={headerInfo}
      quantity={quantity}
      setQuantity={setQuantity}
      addItemToCart={addItemToCart}
      buyItemToWhatsApp={buyItemToWhatsApp}
      catalogInfo={catalogInfo}
      item={item}
    />
  );
}
