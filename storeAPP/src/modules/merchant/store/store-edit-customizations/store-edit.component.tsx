import BannerEditContainer from "./banner-edit/banner-edit.container";
import NavbarEditContainer from "./navbar-edit/navbar-edit.container";
import CatalogEditContainer from "./catalog-edit/catalog-edit.container";
import HeaderEditContainer from "./header-edit/header-edit.container";
import { Button } from "@/components/ui";
import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  saveLayout: () => void;
  initialCustomizationsData: storeCustomizationsDivided;
};

export default function StoreEditComponent({
  saveLayout,
  initialCustomizationsData,
}: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-gray-800 font-semibold text-2xl">
        Editar Layout da Loja
      </h1>
      <div className="flex items-start my-2 justify-between">
        <p style={{ width: "28rem" }} className="text-gray-400">
          Para atualizar o layout da loja, clique nos componentes abaixo e
          edite-os conforme necessário. Após realizar as alterações, clique no
          botão "Salvar layout" para aplicar as mudanças.
        </p>
        <div className="flex items-center gap-3">
          <Button onClick={saveLayout}>Salvar layout</Button>
        </div>
      </div>
      <div className="space-y-8 shadow-xl border border-black">
        <HeaderEditContainer
          initialCustomizationsHeader={initialCustomizationsData.header}
        />
        <BannerEditContainer
          initialCustomizationsBanner={initialCustomizationsData.banner}
        />
        <NavbarEditContainer
          initialCustomizationsNavbar={initialCustomizationsData.navbar}
        />
        <CatalogEditContainer
          initialCustomizationsCatalog={initialCustomizationsData.catalog}
        />
      </div>
    </div>
  );
}
