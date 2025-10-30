import { useState } from 'react';
import { BannerOption } from '@/config/banners';
import { Check, Image } from '@phosphor-icons/react';

interface BannerSelectorProps {
  banners: BannerOption[];
  selectedBanner: string | null;
  onSelectBanner: (bannerId: string) => void;
  onClose: () => void;
}

export default function BannerSelectorComponent({
  banners,
  selectedBanner,
  onSelectBanner,
  onClose
}: BannerSelectorProps) {
  const [hoveredBanner, setHoveredBanner] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Selecionar Banner Pré-disposto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedBanner === banner.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onMouseEnter={() => setHoveredBanner(banner.id)}
              onMouseLeave={() => setHoveredBanner(null)}
              onClick={() => onSelectBanner(banner.id)}
            >
              <div className="relative">
                <img
                  src={banner.preview}
                  alt={banner.name}
                  className="w-full h-48 object-cover"
                />
                
                {selectedBanner === banner.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check size={16} />
                  </div>
                )}

                {hoveredBanner === banner.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Image size={32} className="mx-auto mb-2" />
                      <p className="font-semibold">Clique para selecionar</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {banner.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {banner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Clique em um banner para selecioná-lo. Você também pode fazer upload de sua própria imagem.
          </p>
        </div>
      </div>
    </div>
  );
} 