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
          <Link href="#features" className="hover:text-white transition-colors">Özellikler</Link>
          <Link href="#store" className="hover:text-white transition-colors">Mağaza</Link>
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

        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-start mt-20">
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
              href="#features" 
              className="flex items-center justify-center bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300"
            >
              Detayları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container px-4 md:px-6">
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
    </div>
  );
}
