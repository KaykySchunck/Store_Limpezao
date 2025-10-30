import NavbarCustomizationModalContainer from "../modal/navbar-customization-modal/navbar-customization-modal.container";

type NavbarEditComponentProps = {
  backgroundColor: string;
  colorText: string;
  showModal: boolean;
  toggleMenu: () => void;
  setBackgroundColor: (color: string) => void;
  setColorText: (color: string) => void;
};

export default function NavbarEditComponent({
  backgroundColor,
  colorText,
  showModal,
  toggleMenu,
  setBackgroundColor,
  setColorText,
}: NavbarEditComponentProps) {
  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        style={{ backgroundColor }}
        className="cursor-pointer shadow-lg w-full py-4 px-6 transition-all duration-300 ease-in-out"
      >
        <h1
          style={{ color: colorText }}
          className="text-3xl font-semibold drop-shadow-lg mb-4"
        >
          Categorias
        </h1>
        <ul className="flex gap-2">
          {["Category 1", "Category 2", "Category 3"].map((category, index) => (
            <li
              key={index}
              style={{ color: colorText }}
              className="text-lg font-medium"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <NavbarCustomizationModalContainer
          backgroundColor={backgroundColor}
          categoriesColor={colorText}
          setBackgroundColor={setBackgroundColor}
          setCategoriesColor={setColorText}
        />
      )}
    </div>
  );
}
