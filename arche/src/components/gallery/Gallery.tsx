import React, { useState } from "react";
import { Property } from "../../types";

interface GalleryProps {
  property: Property;
}

const Gallery: React.FC<GalleryProps> = ({ property }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainImage, setMainImage] = useState(property.images[0]);

  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    setMainImage(property.images[index]);
  };

  return (
    <div className="flex flex-col gap-[2px]">
      <div className="grid grid-cols-[2fr_1fr] grid-rows-[300px_200px] gap-[2px]">
        {/* Main */}
        <div className="row-span-2 relative overflow-hidden">
          <img src={mainImage} alt={property.name} className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute bottom-4 right-4 text-[9px] tracking-[2px] uppercase bg-[#0e0e0e]/70 text-[#f0ede6] px-3 py-2 border border-white/20 backdrop-blur-sm">
            {activeIndex + 1} / {property.images.length} photos
          </div>
        </div>

        {/* Side A */}
        <div className="relative overflow-hidden cursor-pointer" onClick={() => handleThumbClick(1)}>
          <img src={property.images[1]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-all duration-300" />
        </div>

        {/* Side B */}
        <div className="relative overflow-hidden cursor-pointer" onClick={() => handleThumbClick(2)}>
          <img src={property.images[2]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-all duration-300" />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-[2px]">
        {property.images.slice(3, 8).map((img, i) => (
          <div
            key={i}
            className={`flex-1 h-16 overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
              activeIndex === i + 3 ? "border-[#c9a96e]" : "border-transparent hover:border-white/30"
            }`}
            onClick={() => handleThumbClick(i + 3)}
          >
            <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
