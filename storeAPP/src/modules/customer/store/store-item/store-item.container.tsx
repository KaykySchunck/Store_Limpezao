import React from "react";
import StoreItemComponent from "./store-item.component";

export default function StoreItemContainer({
  imageUrl,
  name,
  value,
  onAddToCart,
}: any) {
  return <StoreItemComponent imageUrl={imageUrl} name={name} value={value} />;
}
