import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoreCatalogComponent from "./store-catalog.component";
import { URL_PURCHASE } from "@/constants/urls";
import { useStoreCustomizationsContext } from "@/modules/contexts/store-context/store-customer-customizations-context";
import { useCatalogContext } from "@/modules/contexts/store-context/catalog-context";
import { getItensWithImagesService } from "@/services/itens.service";

type StoreCatalogContainerProps = {
  storeId: string;
};

export default function StoreCatalogContainer({
  storeId,
}: StoreCatalogContainerProps) {
  const { catalogInfo } = useStoreCustomizationsContext();
  const { selectedCategoryId } = useCatalogContext();
  const [itens, setItens] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<number>(1);
  const router = useRouter();

  // Busca os itens com as imagens
  useEffect(() => {
    const fetchItens = async () => {
      try {
        setLoading(true);
        const data = await getItensWithImagesService(
          storeId,
          selectedCategoryId || ""
        );
        setItens(data.itensWithImages || []); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
        setItens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItens();
  }, [storeId, selectedCategoryId]);

  // Ajusta o número de colunas com base no tamanho da tela
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(4);
      } else if (window.innerWidth >= 768) {
        setColumns(3);
      } else if (window.innerWidth >= 480) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Navega para a página de detalhes do item
  const openItemDetails = (itemId: string) => {
    console.log(`Item ID: ${itemId}`);
    router.push(`./store/${itemId}${URL_PURCHASE}`);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!itens || itens.length === 0) {
    return <div>Nenhum item encontrado.</div>;
  }

  return (
    <StoreCatalogComponent
      openItemDetails={openItemDetails}
      customizations={catalogInfo}
      columns={columns}
      itens={itens}
    />
  );
}
