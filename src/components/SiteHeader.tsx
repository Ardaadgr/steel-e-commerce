"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/store/useCart"
import { usePathname } from "next/navigation"

export function SiteHeader({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const { items, setIsOpen } = useCart()
  const pathname = usePathname()

  // Hide header on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="absolute top-0 w-full z-40 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
        STEEL<span className="text-blue-500">.</span>
      </Link>
      
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
        <Link href="/#about" className="hover:text-white transition-colors">Hakkımızda</Link>
        <Link href="/#products" className="hover:text-white transition-colors">Ürünler</Link>
        <Link href="/#features" className="hover:text-white transition-colors">Özellikler</Link>
        <Link href="/#contact" className="hover:text-white transition-colors">İletişim</Link>
      </nav>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Link 
            href="/account"
            className="flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            <span className="hidden md:inline">Hesabım</span>
          </Link>
        ) : (
          <div className="flex items-center space-x-3 text-sm font-medium">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors hidden md:block">
              Giriş Yap
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Kayıt Ol
            </Link>
          </div>
        )}
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-sm">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
