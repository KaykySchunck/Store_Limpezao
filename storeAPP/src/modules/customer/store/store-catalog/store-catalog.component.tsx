import { storeCustomizationsDivided } from "@/@types/store";
import StoreItemContainer from "../store-item/store-item.container";

type StoreCatalogComponentProps = {
  customizations: storeCustomizationsDivided["catalog"];
  columns: number;
  openItemDetails: (itemId: string) => void;
  itens: any[];
};

export default function StoreCatalogComponent({
  customizations,
  columns,
  openItemDetails,
  itens,
}: StoreCatalogComponentProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: customizations.backgroundColor,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {itens.map((item) => (
        <div
          key={item.id}
          onClick={() => openItemDetails(item.id)}
          style={{ cursor: "pointer" }}
        >
          <StoreItemContainer
            name={item.name}
            value={item.value}
            imageUrl={item.images?.[0]?.url} // Exibe a primeira imagem do item
          />
        </div>
      ))}
    </div>
  );
}
