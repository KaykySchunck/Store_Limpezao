import { Store } from "@/@types/store";
import { Button } from "@/components/ui";
import {
  URL_DETAIL,
  URL_EDIT,
  URL_STORE_DASHBOARD,
  URL_STORE_EDIT,
  URL_STORE_EDIT_CUSTOMIZATIONS,
} from "@/constants/urls";
import Link from "next/link";

type Props = {
  merchantId: string;
  onEditStore: (storeId: string) => void;
  stores: Store[] | null;
};

export default function ListStoresComponent(inProps: Props) {
  const { merchantId, onEditStore, stores } = inProps;

  return (
    <div className="m-4 rounded-lg">
      <div className="flex flex-col gap-4">
        {Array.isArray(stores) &&
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium text-lg">
                  {store.name}
                </span>
                <div className="flex gap-4">
                  <Link
                    href={`.${URL_STORE_DASHBOARD}/${store.id}${URL_STORE_EDIT_CUSTOMIZATIONS}`}
                  >
                    <Button variant="outline" className="bg-white">
                      Editar layout da loja
                    </Button>
                  </Link>
                  <div>
                    <Button
                      onClick={() => onEditStore(store.id || "")}
                      variant="outline"
                      className="bg-white"
                    >
                      Editar informações
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
