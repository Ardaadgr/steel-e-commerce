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
      
      <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
        <CardHeader>
          <CardTitle>Tüm Siparişler</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-zinc-950 border-b border-zinc-800 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Sipariş ID</th>
                  <th className="px-6 py-4 font-medium">Müşteri</th>
                  <th className="px-6 py-4 font-medium">Adresler</th>
                  <th className="px-6 py-4 font-medium">Fatura Tipi</th>
                  <th className="px-6 py-4 font-medium">Tutar</th>
                  <th className="px-6 py-4 font-medium">Durum Güncelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {order.id.slice(-6)}<br/>
                      <span className="text-zinc-600">{new Date(order.createdAt).toLocaleDateString("tr-TR")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{order.customerName}</div>
                      <div className="text-gray-400">{order.customerEmail}</div>
                      <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="mb-2">
                        <strong className="text-gray-300">Teslimat:</strong><br/>
                        {order.address}, {order.district}/{order.city}
                      </div>
                      <div>
                        <strong className="text-gray-300">Fatura:</strong><br/>
                        {order.billingAddress}, {order.billingDistrict}/{order.billingCity}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {order.invoiceType === "CORPORATE" ? (
                        <>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold mb-1 inline-block">Kurumsal</span><br/>
                          <div className="font-bold text-gray-300">{order.companyName}</div>
                          <div>{order.taxOffice}</div>
                          <div className="font-mono">VN: {order.taxId}</div>
                        </>
                      ) : (
                        <>
                          <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded font-bold mb-1 inline-block">Bireysel</span><br/>
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
                          className={`bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-red-500 ${
                            order.status === 'PROCESSING' ? 'text-green-500' : 
                            order.status === 'PENDING' ? 'text-yellow-500' : 
                            'text-white'
                          }`}
                        >
                          <option value="PENDING" className="text-yellow-500">Bekliyor (Ödeme Yok)</option>
                          <option value="PROCESSING" className="text-green-500">Hazırlanıyor (Ödendi)</option>
                          <option value="SHIPPED" className="text-blue-500">Kargolandı</option>
                          <option value="DELIVERED" className="text-gray-400">Teslim Edildi</option>
                          <option value="CANCELLED" className="text-red-500">İptal Edildi</option>
                        </select>
                        <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-2 py-1 rounded transition-colors w-full cursor-pointer">
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
