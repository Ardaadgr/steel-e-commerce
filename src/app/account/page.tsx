import { getCustomerSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Package, LogOut, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await getCustomerSession()

  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    redirect("/login")
  }

  // Fetch orders for this customer (assuming customerEmail matches user's email)
  const orders = await prisma.order.findMany({
    where: { customerEmail: user.email },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } }
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-24 transition-colors">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Hesabım</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Hoş geldin, {user.name || user.email}</p>
          </div>
          
          {/* Use native <a> tag instead of <Link> for full page refresh on logout to clear cached layouts */}
          <a href="/api/auth/customer-logout" className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Geçmiş Siparişlerim</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tüm siparişlerinizi ve güncel durumlarını buradan takip edebilirsiniz.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <Activity className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Henüz Siparişiniz Yok</h3>
              <p className="text-slate-500 mb-6">Antrenmanlarınızı yeni boyuta taşımak için ilk siparişinizi verin.</p>
              <Link href="/#products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Mağazaya Git
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Sipariş Tarihi</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString("tr-TR")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Toplam Tutar</p>
                      <p className="font-bold text-blue-600">₺{order.totalAmount.toLocaleString("tr-TR")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Durum</p>
                      <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <Link href={`/account/orders/${order.id}`} className="flex items-center text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                      Sipariş Detayı <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800">
                    {order.items.length > 0 ? order.items.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.images[0] && (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm line-clamp-1">{item.product.name}</h4>
                          <p className="text-slate-500 text-xs mt-1">Adet: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-sm">
                          ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                        </div>
                      </div>
                    )) : (
                      <div className="py-4 text-sm text-slate-500">
                        * Bu siparişteki ürün detaylarına ulaşılamıyor (Eski sistem kaydı).
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
