import { getCustomerSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle2, CreditCard, Clock, FileText, MapPin } from "lucide-react"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getCustomerSession()

  if (!session) {
    redirect("/login")
  }

  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: { items: { include: { product: true } } }
  })

  if (!order) {
    notFound()
  }

  // Ensure user owns this order
  if (order.customerEmail !== session.user.email) {
    redirect("/account")
  }

  const productTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = productTotal * 0.2 // Assuming 20% VAT in the system currently

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/account" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Siparişlerime Dön
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sipariş Özeti</h1>
              <p className="text-slate-500 mt-1">Sipariş No: <span className="font-mono text-slate-700">{order.id}</span></p>
            </div>
            
            <div className={`px-4 py-2 rounded-lg border font-bold flex items-center gap-2 ${
              order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              order.status === 'SHIPPED' ? 'bg-purple-50 text-purple-700 border-purple-200' :
              order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
              order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              'bg-red-50 text-red-700 border-red-200'
            }`}>
              {order.status === 'DELIVERED' ? <CheckCircle2 className="w-5 h-5" /> : 
               order.status === 'SHIPPED' ? <Truck className="w-5 h-5" /> : 
               <Clock className="w-5 h-5" />}
              {order.status}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Products */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <Package className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Ürünler</h2>
              </div>
              
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                      {item.product.images[0] && (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-slate-900 line-clamp-2">{item.product.name}</h3>
                      <p className="text-slate-500 text-sm mt-1">Birim Fiyat: ₺{item.price.toLocaleString("tr-TR")}</p>
                      <p className="text-slate-500 text-sm">Adet: {item.quantity}</p>
                    </div>
                    <div className="font-black text-slate-900 text-lg flex items-center">
                      ₺{(item.price * item.quantity).toLocaleString("tr-TR")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Teslimat & Fatura Bilgileri</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Teslimat Adresi</h3>
                  <div className="text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p>{order.customerPhone}</p>
                    <p className="mt-2 text-sm">{order.address}</p>
                    <p className="text-sm">{order.district}, {order.city}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Fatura Adresi</h3>
                  <div className="text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">{order.invoiceType === 'CORPORATE' ? order.companyName : order.customerName}</p>
                    {order.invoiceType === 'CORPORATE' ? (
                      <>
                        <p className="text-sm text-slate-500">VD: {order.taxOffice}</p>
                        <p className="text-sm text-slate-500">VN: {order.taxId}</p>
                      </>
                    ) : (
                      order.tcId && <p className="text-sm text-slate-500">TC: {order.tcId}</p>
                    )}
                    <p className="mt-2 text-sm">{order.billingAddress || order.address}</p>
                    <p className="text-sm">{order.billingDistrict || order.district}, {order.billingCity || order.city}</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <div className="space-y-8">
            
            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Ödeme Özeti</h2>
              </div>
              
              <div className="space-y-4 text-slate-600 text-sm">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="font-medium text-slate-900">₺{productTotal.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="font-bold text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergi (KDV %20)</span>
                  <span className="font-medium text-slate-900">₺{tax.toLocaleString("tr-TR")}</span>
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-base">Genel Toplam</span>
                  <span className="font-black text-2xl text-blue-600">₺{order.totalAmount.toLocaleString("tr-TR")}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Ödeme Yöntemi</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bu sipariş <strong className="text-slate-700">İyzico 256-bit SSL</strong> güvenli ödeme altyapısı kullanılarak kredi/banka kartı ile ödenmiştir.
              </p>
              {order.iyzicoId && (
                <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100 font-mono">
                  İşlem Ref: {order.iyzicoId}
                </p>
              )}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}
