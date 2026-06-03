import Link from "next/link";
import { Activity, LayoutDashboard, ShoppingCart, Settings } from "lucide-react";
import LogoutButton from "./LogoutButton";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <Link href="/" className="text-xl font-black tracking-tighter flex items-center">
          STEEL<span className="text-blue-600">.</span> <span className="text-xs ml-2 text-slate-400 font-normal">ADMIN</span>
        </Link>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
          <LayoutDashboard className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/admin/products" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">Ürünler</span>
        </Link>
        <Link href="/admin/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
          <Activity className="w-5 h-5" />
          <span className="font-medium">Siparişler</span>
        </Link>
        <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Ayarlar</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <LogoutButton />
      </div>
    </aside>
  );

  const header = (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden">
      <span className="font-black text-xl">STEEL<span className="text-blue-600">.</span></span>
      <Activity className="w-6 h-6 text-blue-600" />
    </header>
  );

  return (
    <AdminLayoutWrapper sidebar={sidebar} header={header}>
      {children}
    </AdminLayoutWrapper>
  );
}
