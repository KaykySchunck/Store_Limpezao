import { storeCustomizationsDivided } from "@/@types/store";
import { ShoppingCart } from "lucide-react";

type Props = {
  customizations: storeCustomizationsDivided["header"];
  cart: () => void;
};

export default function HeaderCustomerComponent({
  customizations,
  cart,
}: Props) {
  return (
    <div className="relative z-10">
      <div
        style={{ backgroundColor: customizations.backgroundColor }}
        className="shadow-lg w-full py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <h1
          style={{ color: customizations.colorText }}
          className="text-3xl font-semibold drop-shadow-lg w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {customizations.titleText}
        </h1>
        <ShoppingCart
          onClick={cart}
          style={{ color: customizations.colorText, cursor: "pointer" }}
          size={30}
        />
      </div>
    </div>
  );
}
