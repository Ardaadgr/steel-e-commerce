import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Star, CreditCard, ChevronDown } from "lucide-react"
import ProductGallery from "@/components/ProductGallery"

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!product) {
    notFound()
  }

  // Use Isophit-inspired premium layout
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24">
      {/* Top Navigation Bar */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/#products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Link>
          <div className="text-xl font-extrabold tracking-tighter text-slate-900">
            STEEL<span className="text-blue-600">.</span>
          </div>
          <div className="w-20" /> {/* Spacer to center the logo */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery (60%) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Info (40%) */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0">
            <div className="sticky top-24">
              {/* Reviews / Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm font-medium text-slate-600 ml-2 underline cursor-pointer hover:text-slate-900">
                  128 Değerlendirme
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                {product.name}
              </h1>

              {/* Price & Installments */}
              <div className="mb-8">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₺{product.price.toLocaleString("tr-TR")}
                </div>
                <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                  <CreditCard className="w-5 h-5 text-slate-400 mr-3" />
                  <span>Kredi kartına <strong>12 aya varan</strong> taksit imkanı ile ödeyin.</span>
                </div>
              </div>

              {/* Core Features List */}
              <div className="space-y-4 mb-8 bg-white">
                <div className="flex items-start text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base font-medium">Tüm egzersizler için entegre izometrik platform.</span>
                </div>
                <div className="flex items-start text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base font-medium">10 Yıl Gövde Garantisi ile kırılmaz çelik yapı.</span>
                </div>
                <div className="flex items-start text-slate-700">
                  <Truck className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base font-medium">Türkiye içi tüm siparişlerde Ücretsiz Kargo & Kurulum.</span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="mb-10">
                {product.stock > 0 ? (
                  <Link 
                    href={`/checkout?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.images[0] || "")}`} 
                    className="w-full block"
                  >
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center">
                      Satın Al
                      <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                    </button>
                  </Link>
                ) : (
                  <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-5 px-8 rounded-xl cursor-not-allowed text-lg text-center">
                    Tükendi - Stokta Yok
                  </button>
                )}
                
                {product.stock > 0 && (
                  <p className="text-center text-sm font-medium text-green-600 mt-4 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Stokta var ve gönderime hazır.
                  </p>
                )}
              </div>

              {/* Accordions / Dropdowns */}
              <div className="border-t border-slate-200 divide-y divide-slate-200">
                <details className="group" open>
                  <summary className="flex items-center justify-between cursor-pointer py-5 text-lg font-bold text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                    Açıklama
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </span>
                  </summary>
                  <div className="pb-6 text-slate-600 text-base leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-5 text-lg font-bold text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                    Teknik Özellikler
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </span>
                  </summary>
                  <div className="pb-6 text-slate-600 text-base leading-relaxed">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Yüksek dayanımlı endüstriyel çelik malzeme</li>
                      <li>Fırın boya / Korozyon korumalı dış yüzey</li>
                      <li>Sıfır eklem baskısı sağlayan izometrik kilit mekanizması</li>
                      <li>Maksimum taşıma/direnç kapasitesi: 1500 kg</li>
                      <li>Ölçüler: 180cm x 120cm x 220cm</li>
                    </ul>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-5 text-lg font-bold text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                    Kargo & İade
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </span>
                  </summary>
                  <div className="pb-6 text-slate-600 text-base leading-relaxed">
                    <p className="mb-3">
                      Siparişleriniz üretim aşamasından sonra <strong>7-14 iş günü</strong> içerisinde ücretsiz olarak teslim edilir ve profesyonel ekibimiz tarafından kurulur.
                    </p>
                    <p>
                      Kullanıcı kaynaklı olmayan arızalarda veya kargo hasarlarında 14 gün içerisinde koşulsuz iade ve değişim hakkınız bulunmaktadır.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
