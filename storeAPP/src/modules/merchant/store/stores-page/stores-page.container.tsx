import { useState } from "react";
import StoresPageComponent from "./stores-page.component";
import CreateStoreContainer from "../create/create-store..container";

interface StoresPageContainerProps {
  merchantId: string;
}

export default function StoresPageContainer({
  merchantId,
}: StoresPageContainerProps) {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  return (
    <>
      <StoresPageComponent
        setIsModalOpenCreate={setIsModalOpenCreate}
        merchantId={merchantId}
      />
      {isModalOpenCreate && (
        <CreateStoreContainer
          setIsModalOpenCreate={setIsModalOpenCreate}
          merchantId={merchantId}
        />
      )}
    </>
  );
}
