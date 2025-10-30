import StoreItemContainer from "@/modules/customer/store/store-item/store-item.container";
import CatalogCustomizationModalContainer from "../modal/catalog-customization-modal/catalog-customization-modal.container";
import backgroundImageFake from "../../../../../../public/images/bagckgorundImageFake.webp";
import { formatCurrency } from "@/components/ui/inputCurrency";

type Props = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  showModal: boolean;
  toggleMenu: () => void;
};

export default function CatalogEditComponent({
  backgroundColor,
  setBackgroundColor,
  showModal,
  toggleMenu,
}: Props) {
  return (
    <>
      {showModal && (
        <CatalogCustomizationModalContainer
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          onClose={toggleMenu}
        />
      )}
      <div
        onClick={toggleMenu}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: backgroundColor,
        }}
      >
        {[
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },       
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
          {
            imageUrl: backgroundImageFake,
            name: "Nome do item",
            price: 59.99,
          },
        ].map((item, index) => (
          <div
            key={index} // Added key prop for list items
            style={{ padding: "1rem" }}
            className="bg-white rounded-lg shadow-md flex flex-col items-center text-center gap-4 border border-black"
          >
            <img
              src={item.imageUrl.src} // Access the src property from the imported image
              className="w-full h-40 object-cover rounded-md"
              alt={item.name} // Added alt text for accessibility
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h3>
              <p className="text-green-600 font-medium">
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
