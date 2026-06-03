import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, CreditCard } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalRevenue = orders.filter((o: any) => o.status === "PROCESSING" || o.status === "DELIVERED" || o.status === "SHIPPED")
                             .reduce((acc: number, order: any) => acc + order.totalAmount, 0);
  
  const successfulOrders = orders.filter((o: any) => o.status !== "PENDING" && o.status !== "CANCELLED").length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Genel Bakış</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Toplam Ciro</CardTitle>
            <DollarSign className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalRevenue.toLocaleString("tr-TR")}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Başarılı Siparişler</CardTitle>
            <CreditCard className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulOrders} Adet</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Bekleyen Ödemeler</CardTitle>
            <Activity className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o: any) => o.status === "PENDING").length} Adet</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle>Son Siparişler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-slate-500">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₺{order.totalAmount.toLocaleString("tr-TR")}</p>
                    <p className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${order.status === 'PROCESSING' ? 'bg-green-100 text-green-700' : order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-slate-500 text-center py-4">Henüz sipariş bulunmuyor.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
