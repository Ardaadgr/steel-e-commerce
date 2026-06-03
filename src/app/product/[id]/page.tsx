import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react"

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) {
    notFound()
  }

  const mainImage = product.images[0] || "https://placehold.co/600x600";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ana Sayfaya Dön
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            
            {/* Image Gallery */}
            <div className="p-8 md:p-12 bg-slate-50 flex items-center justify-center">
              <div className="aspect-square w-full relative rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.stock > 0 ? 'Stokta Var' : 'Tükendi'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-blue-600 mb-6">
                ₺{product.price.toLocaleString("tr-TR")}
              </div>
              
              <div className="prose prose-slate mb-8 max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                  <span>Üst düzey paslanmaz çelik profil</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-green-600 mr-3" />
                  <span>10 Yıl Gövde Garantisi</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Truck className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Ücretsiz Türkiye İçi Teslimat</span>
                </div>
              </div>

              {product.stock > 0 ? (
                <Link 
                  href={`/checkout?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(mainImage)}`} 
                  className="w-full block"
                >
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1 text-lg">
                    Hemen Satın Al
                  </button>
                </Link>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-4 px-8 rounded-xl cursor-not-allowed text-lg">
                  Stokta Yok
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
