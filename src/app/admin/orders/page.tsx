import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateOrderStatus } from "./actions";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
      
      <Card className="bg-white border-slate-200 text-slate-900 overflow-hidden shadow-sm">
        <CardHeader>
          <CardTitle>Tüm Siparişler</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Sipariş ID</th>
                  <th className="px-6 py-4 font-medium">Müşteri</th>
                  <th className="px-6 py-4 font-medium">Adresler</th>
                  <th className="px-6 py-4 font-medium">Fatura Tipi</th>
                  <th className="px-6 py-4 font-medium">Tutar</th>
                  <th className="px-6 py-4 font-medium">Durum Güncelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {order.id.slice(-6)}<br/>
                      <span className="text-slate-400">{new Date(order.createdAt).toLocaleDateString("tr-TR")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{order.customerName}</div>
                      <div className="text-slate-500">{order.customerEmail}</div>
                      <div className="text-slate-500 text-xs">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="mb-2">
                        <strong className="text-slate-700">Teslimat:</strong><br/>
                        {order.address}, {order.district}/{order.city}
                      </div>
                      <div>
                        <strong className="text-slate-700">Fatura:</strong><br/>
                        {order.billingAddress}, {order.billingDistrict}/{order.billingCity}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {order.invoiceType === "CORPORATE" ? (
                        <>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold mb-1 inline-block">Kurumsal</span><br/>
                          <div className="font-bold text-slate-700">{order.companyName}</div>
                          <div>{order.taxOffice}</div>
                          <div className="font-mono">VN: {order.taxId}</div>
                        </>
                      ) : (
                        <>
                          <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded font-bold mb-1 inline-block">Bireysel</span><br/>
                          <div className="font-mono">TC: {order.tcId || "Belirtilmedi"}</div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      ₺{order.totalAmount.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">
                      <form action={updateOrderStatus.bind(null, order.id)} className="flex flex-col gap-2">
                        <select 
                          name="status" 
                          defaultValue={order.status}
                          className={`bg-white border border-slate-300 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500 ${
                            order.status === 'PROCESSING' ? 'text-green-600' : 
                            order.status === 'PENDING' ? 'text-yellow-600' : 
                            'text-slate-900'
                          }`}
                        >
                          <option value="PENDING" className="text-yellow-600">Bekliyor (Ödeme Yok)</option>
                          <option value="PROCESSING" className="text-green-600">Hazırlanıyor (Ödendi)</option>
                          <option value="SHIPPED" className="text-blue-600">Kargolandı</option>
                          <option value="DELIVERED" className="text-slate-500">Teslim Edildi</option>
                          <option value="CANCELLED" className="text-red-600">İptal Edildi</option>
                        </select>
                        <button type="submit" className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 text-xs px-2 py-1 rounded transition-colors w-full cursor-pointer">
                          Kaydet
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Henüz sipariş bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
