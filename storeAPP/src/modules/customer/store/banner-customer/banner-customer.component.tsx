import { storeCustomizationsDivided } from "@/@types/store";

type Props = {
  customizations: storeCustomizationsDivided["banner"];
};

export default function BannerCustomerComponent({ customizations }: Props) {
  const imageUrl = customizations.imageUrl ?? undefined;
  const hasImage = Boolean(imageUrl);
  console.log(imageUrl);

  if (hasImage) {
    return (
      <img src={imageUrl} alt="Banner" className="w-full h-32 object-cover" />
    );
  } else {
    return <></>;
  }
}
