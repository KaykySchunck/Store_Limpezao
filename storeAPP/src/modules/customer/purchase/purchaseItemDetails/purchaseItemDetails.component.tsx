import { useState } from "react";
import { Button } from "@/components/ui";
import { ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { formatCurrency } from "@/modules/formatters/format-currency";
import { URL_SHOPPING_CART } from "@/constants/urls";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  headerInfo: any; // Substitua pelo tipo correto
  item: any;
  catalogInfo: any; // Substitua pelo tipo correto
  addItemToCart: () => void;
  buyItemToWhatsApp: () => void;
  setQuantity: (quantity: number) => void;
  quantity: number;
};

export default function PurchaseItemDetailsComponent({
  item,
  headerInfo,
  quantity,
  setQuantity,
  catalogInfo,
  addItemToCart,
  buyItemToWhatsApp,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      {/* Header */}
      <div className="relative z-10">
        <div
          style={{ backgroundColor: headerInfo.backgroundColor }}
          className="shadow-lg w-full py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between"
        >
          <h1
            style={{ color: headerInfo.colorText }}
            className="text-3xl font-semibold drop-shadow-lg w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {headerInfo.titleText}
          </h1>
          <Link href={`../${URL_SHOPPING_CART}`}>
            <ShoppingCart
              style={{ color: headerInfo.colorText, cursor: "pointer" }}
              size={30}
            />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center bg-gray-50">
        <div
          style={{ backgroundColor: catalogInfo.backgroundColor }}
          className="flex flex-col items-center justify-center w-full min-h-[80vh] p-2 sm:p-6"
        >
          {/* Product Details Card */}
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg w-full max-w-5xl">
            <h1 className="text-xl font-semibold mb-4 text-gray-800">
              Detalhes do Produto
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image Carousel */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div className="flex flex-row items-center justify-between w-full h-full">
                  {/* Seta Esquerda - Só aparece se houver mais de uma imagem */}
                  {item.images.length > 1 && (
                    <button
                      onClick={handlePrevImage}
                      className="p-3 bg-gradient-to-r bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    >
                      <ArrowLeft />
                    </button>
                  )}

                  {/* Foto no Centro */}
                  <div className="flex-grow mx-4 h-full flex items-center justify-center">
                    <div className="w-full max-w-[400px] h-64 sm:h-96 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.images[currentImageIndex].url}
                        alt={`Imagem ${currentImageIndex + 1} do item ${item.name}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Seta Direita - Só aparece se houver mais de uma imagem */}
                  {item.images.length > 1 && (
                    <button
                      onClick={handleNextImage}
                      className="p-3 bg-gradient-to-r bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                    >
                      <ArrowRight />
                    </button>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full p-6 flex flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Categoria: {item.categorie}
                  </p>
                </div>

                <p className="text-3xl font-semibold text-green-600">
                  {formatCurrency(item.value)}
                </p>

                <p className="text-gray-500 text-sm">
                  <strong>Estoque disponível:</strong> {item.stock} unidades
                </p>

                <p className="text-gray-700">{item.description}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="quantity"
                    className="text-gray-700 font-medium"
                  >
                    Quantidade:
                  </label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : 1)
                      }
                    >
                      -
                    </Button>
                    <input
                      id="quantity"
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-l border-r outline-none"
                    />
                    <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <Button onClick={addItemToCart} className="w-full sm:w-auto">
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="success"
                  onClick={buyItemToWhatsApp}
                  className="w-full sm:w-auto"
                >
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
