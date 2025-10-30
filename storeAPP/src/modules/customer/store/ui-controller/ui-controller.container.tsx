import { useGetStoreByUrl } from "@/hooks/store/useGetStoreByUrl";
import UiControllerComponent from "./ui-controller.component";

type Props = {
  url: string;
};

export default function UiControllerContainer({ url }: Props) {
  const { store } = useGetStoreByUrl(url);
  const storeId = store?.id ?? "";

  return <UiControllerComponent storeId={storeId} />;
}
