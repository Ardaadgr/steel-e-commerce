"use client";

import { useState } from "react";

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : ["https://placehold.co/800x800"];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 pb-2 md:pb-0 scrollbar-hide">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === idx ? 'border-blue-600 opacity-100 ring-2 ring-blue-600/20 ring-offset-1' : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
            }`}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-white rounded-2xl overflow-hidden relative aspect-square border border-slate-200 shadow-sm flex items-center justify-center">
        <img 
          src={displayImages[currentIndex]} 
          alt={productName}
          className="absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  )
}
