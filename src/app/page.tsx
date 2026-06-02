import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation (Transparent) */}
      <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
        <div className="text-2xl font-extrabold tracking-tighter text-white">
          STEEL<span className="text-red-600">.</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <Link href="#about" className="hover:text-white transition-colors">Hakkımızda</Link>
          <Link href="#products" className="hover:text-white transition-colors">Ürünler</Link>
          <Link href="#features" className="hover:text-white transition-colors">Özellikler</Link>
          <Link href="#contact" className="hover:text-white transition-colors">İletişim</Link>
        </nav>
        <Link href="/checkout" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/10">
          Sipariş Ver
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Gradient/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          {/* Abstract geometric background simulating mechanical parts */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black opacity-40" />
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="container mx-auto relative z-20 px-4 md:px-6 flex flex-col items-start mt-20">
          <div className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm text-red-500 mb-6">
            <Activity className="w-4 h-4 mr-2" />
            <span className="font-medium">Profesyonel İzometrik Sistem</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] max-w-4xl uppercase">
            Gücün <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Saf Hali.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl font-light">
            Eklemlere sıfır baskı ile maksimum kas aktivasyonu. Profesyonel sporcular ve rehabilitasyon merkezleri için tasarlandı.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/checkout" 
              className="group flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              Hemen İncele
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#products" 
              className="flex items-center justify-center bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300"
            >
              Detayları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Hakkımızda</h2>
              <div className="w-20 h-2 bg-red-600 mb-8" />
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                STEEL Mekanik Spor Sistemleri, geleneksel ağırlık antrenmanlarının yaratabileceği sakatlık risklerini ortadan kaldırırken, kas aktivasyonunu maksimize etmeyi hedefleyen profesyonel bir girişimdir.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Rehabilitasyon merkezlerinden profesyonel spor kulüplerine kadar geniş bir yelpazede kullanılan sistemimiz, Türk mühendisleri tarafından yüksek dayanımlı endüstriyel çelik kullanılarak üretilmektedir.
              </p>
            </div>
            <div className="relative h-[400px] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex items-center justify-center">
              <span className="text-zinc-700 font-bold tracking-widest uppercase">[ Görsel Alanı ]</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <Dumbbell className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maksimum Yük</h3>
              <p className="text-gray-400">Endüstriyel sınıf çelik yapısı sayesinde en ağır antrenmanlara bile dayanır.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sıfır Risk</h3>
              <p className="text-gray-400">İzometrik direnç sistemi sayesinde sakatlık riskini minimuma indirir.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hızlı Gelişim</h3>
              <p className="text-gray-400">Kas liflerini geleneksel ağırlıklara göre %30 daha fazla aktive eder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Detail */}
      <section id="products" className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Sistem Paketleri</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">İhtiyacınıza uygun profesyonel çözümler.</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-2">Standart Paket</h3>
              <p className="text-gray-400 mb-6">Ev kullanımı ve kişisel stüdyolar için.</p>
              <div className="text-4xl font-black text-white mb-8">₺18.500</div>
              <ul className="space-y-4 mb-8 flex-1 text-gray-300">
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> Temel İzometrik İstasyon</li>
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> 5 Farklı Direnç Açısı</li>
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> 2 Yıl Garanti</li>
              </ul>
              <Link href="/checkout" className="block w-full py-4 text-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition-colors">
                Satın Al
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-zinc-900 border-2 border-red-600 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">En Çok Tercih Edilen</div>
              <h3 className="text-2xl font-bold text-white mb-2">Profesyonel Paket</h3>
              <p className="text-gray-400 mb-6">Spor salonları ve klinikler için tam donanım.</p>
              <div className="text-4xl font-black text-white mb-8">₺25.000</div>
              <ul className="space-y-4 mb-8 flex-1 text-gray-300">
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> Gelişmiş İzometrik İstasyon</li>
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> 15 Farklı Direnç Açısı</li>
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> Dijital Kuvvet Ölçer Ekran</li>
                <li className="flex items-center"><Activity className="w-5 h-5 text-red-500 mr-3"/> Ömür Boyu Kasa Garantisi</li>
              </ul>
              <Link href="/checkout" className="block w-full py-4 text-center rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors">
                Hemen Sipariş Ver
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="bg-black py-16 border-t border-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400">
            <div>
              <div className="text-2xl font-extrabold tracking-tighter text-white mb-6">
                STEEL<span className="text-red-600">.</span>
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
                <li><Link href="#about" className="hover:text-red-500 transition-colors">Hakkımızda</Link></li>
                <li><Link href="#products" className="hover:text-red-500 transition-colors">Ürünler</Link></li>
                <li><Link href="/checkout" className="hover:text-red-500 transition-colors">Mağaza</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} STEEL Equipment. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
