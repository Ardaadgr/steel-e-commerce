import Link from "next/link";
import { Activity, LayoutDashboard, ShoppingCart, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-zinc-900 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-900">
          <Link href="/" className="text-xl font-black tracking-tighter flex items-center">
            STEEL<span className="text-red-600">.</span> <span className="text-xs ml-2 text-zinc-500 font-normal">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-red-500" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-900 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">Siparişler</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-900 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Ayarlar</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-red-900/20 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-black border-b border-zinc-900 flex items-center justify-between px-4 md:hidden">
          <span className="font-black text-xl">STEEL<span className="text-red-600">.</span></span>
          <Activity className="w-6 h-6 text-red-500" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
