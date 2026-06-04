import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Dumbbell, ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-20">
        <div className="absolute inset-0 z-0">
          {/* Abstract geometric background simulating modern corporate feel */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 opacity-80" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="container mx-auto relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-6 shadow-sm">
            <Activity className="w-4 h-4 mr-2" />
            <span className="font-medium">Profesyonel İzometrik Sistem</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[1.1] max-w-4xl uppercase">
            Gücün <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-slate-600">Saf Hali.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl font-light">
            Eklemlere sıfır baskı ile maksimum kas aktivasyonu. Profesyonel sporcular ve rehabilitasyon merkezleri için tasarlandı.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link 
              href="#products" 
              className="group flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-md"
            >
              Ürünleri İncele
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#about" 
              className="flex items-center justify-center bg-white border border-slate-300 hover:border-blue-300 hover:bg-blue-50 text-slate-700 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-sm"
            >
              Detayları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Hakkımızda</h2>
              <div className="w-20 h-2 bg-blue-600 mb-8" />
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                STEEL Mekanik Spor Sistemleri, geleneksel ağırlık antrenmanlarının yaratabileceği sakatlık risklerini ortadan kaldırırken, kas aktivasyonunu maksimize etmeyi hedefleyen profesyonel bir girişimdir.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Rehabilitasyon merkezlerinden profesyonel spor kulüplerine kadar geniş bir yelpazede kullanılan sistemimiz, Türk mühendisleri tarafından yüksek dayanımlı endüstriyel çelik kullanılarak üretilmektedir.
              </p>
            </div>
            <div className="relative h-[400px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
              <span className="text-slate-400 font-bold tracking-widest uppercase">[ Görsel Alanı ]</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6">
                <Dumbbell className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Maksimum Yük</h3>
              <p className="text-slate-600">Endüstriyel sınıf çelik yapısı sayesinde en ağır antrenmanlara bile dayanır.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sıfır Risk</h3>
              <p className="text-slate-600">İzometrik direnç sistemi sayesinde sakatlık riskini minimuma indirir.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hızlı Gelişim</h3>
              <p className="text-slate-600">Kas liflerini geleneksel ağırlıklara göre %30 daha fazla aktive eder.</p>
            </div>
          </div>
        </div>
      {/* Products Detail (Dynamic via Prisma) */}
      <section id="products" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Sistem Paketleri</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">İhtiyacınıza uygun profesyonel çözümler.</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
                <div className="aspect-[4/3] bg-white border-b border-slate-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.images[0] || "https://placehold.co/400x300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <div className="text-2xl font-black text-blue-600 mb-4">₺{product.price.toLocaleString("tr-TR")}</div>
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? 'Stokta Var' : 'Tükendi'}
                    </span>
                    <span className="text-blue-600 font-bold group-hover:underline text-sm flex items-center">
                      İncele <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {products.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 text-lg">Şu anda satışta olan ürün bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-400">
            <div>
              <div className="text-2xl font-extrabold tracking-tighter text-white mb-6">
                STEEL<span className="text-blue-500">.</span>
              </div>
              <p>Maksimum kuvvet, sıfır risk. Yeni nesil izometrik antrenman sistemleri ile limitlerinizi aşın.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider">İletişim</h4>
              <ul className="space-y-3">
                <li>info@steelequipment.com</li>
                <li>+90 (555) 123 45 67</li>
                <li>Maslak Mah. Büyükdere Cad. No:1, Sarıyer / İstanbul</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Hızlı Bağlantılar</h4>
              <ul className="space-y-3">
                <li><Link href="#about" className="hover:text-blue-400 transition-colors">Hakkımızda</Link></li>
                <li><Link href="#products" className="hover:text-blue-400 transition-colors">Ürünler</Link></li>
                <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Paneli</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} STEEL Equipment. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
