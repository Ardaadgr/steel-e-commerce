export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const displayImages = images && images.length > 0 ? images : ["https://placehold.co/800x800"];

  return (
    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory gap-4 lg:gap-8 pb-4 lg:pb-0 scrollbar-hide w-full">
      {displayImages.map((img, idx) => (
        <div 
          key={idx}
          className="flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-full bg-white rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[600px] border border-slate-200 shadow-sm flex items-center justify-center snap-center relative"
        >
          <img 
            src={img} 
            alt={`${productName} - Görsel ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
          />
        </div>
      ))}
    </div>
  )
}
