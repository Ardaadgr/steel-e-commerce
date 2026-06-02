import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addProduct, deleteProduct } from "./actions"

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD PRODUCT FORM */}
        <div className="lg:col-span-1">
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Yeni Ürün Ekle</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={addProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ürün Adı</label>
                  <input required name="name" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Açıklama</label>
                  <textarea required name="description" rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Fiyat (₺)</label>
                    <input required name="price" type="number" step="0.01" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Stok</label>
                    <input required name="stock" type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Görsel URL (Virgülle ayırın)</label>
                  <input required name="images" type="text" placeholder="https://..., https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-500 outline-none text-white" />
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  Ürünü Ekle
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* PRODUCTS LIST */}
        <div className="lg:col-span-2">
          <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
            <CardHeader>
              <CardTitle>Mevcut Ürünler ({products.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-zinc-950 border-b border-zinc-800 text-gray-400">
                    <tr>
                      <th className="px-6 py-4 font-medium">Görsel</th>
                      <th className="px-6 py-4 font-medium">Ürün Adı</th>
                      <th className="px-6 py-4 font-medium">Fiyat</th>
                      <th className="px-6 py-4 font-medium">Stok</th>
                      <th className="px-6 py-4 font-medium text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {products.map((product: any) => (
                      <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <img src={product.images[0] || "https://placehold.co/100x100"} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                        <td className="px-6 py-4 font-bold">₺{product.price.toLocaleString("tr-TR")}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                            {product.stock} Adet
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <form action={async () => {
                            'use server'
                            await deleteProduct(product.id)
                          }}>
                            <button type="submit" className="text-red-500 hover:text-red-400 text-xs font-bold underline cursor-pointer">Sil</button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Kayıtlı ürün bulunamadı.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
