import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prisma = new PrismaClient();

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
                  <th className="px-6 py-4 font-medium">Fatura Tipi</th>
                  <th className="px-6 py-4 font-medium">Vergi/TC Bilgisi</th>
                  <th className="px-6 py-4 font-medium">Tutar</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {order.id.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{order.customerName}</div>
                      <div className="text-gray-400">{order.customerEmail}</div>
                      <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.invoiceType === "CORPORATE" ? (
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">Kurumsal</span>
                      ) : (
                        <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs font-bold">Bireysel</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {order.invoiceType === "CORPORATE" ? (
                        <>
                          <div className="font-bold text-gray-300">{order.companyName}</div>
                          <div>{order.taxOffice}</div>
                          <div className="font-mono">VN: {order.taxId}</div>
                        </>
                      ) : (
                        <div className="font-mono">TC: {order.tcId || "Belirtilmedi"}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      ₺{order.totalAmount.toLocaleString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'PROCESSING' ? 'bg-green-500/20 text-green-500' : 
                        order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : 
                        'bg-zinc-800 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                ))}
                
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
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
