import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mağaza Ayarları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CONTACT SETTINGS */}
        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
            <CardDescription className="text-slate-500">
              Müşterilerinize gösterilecek e-posta ve telefon bilgileri.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destek E-Posta Adresi</label>
                <input disabled type="email" defaultValue="destek@ornek.com" className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Numarası</label>
                <input disabled type="text" defaultValue="+90 555 123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm text-slate-400 cursor-not-allowed" />
              </div>
              <button disabled type="button" className="bg-slate-200 text-slate-500 font-bold py-2 px-4 rounded-md cursor-not-allowed w-full">
                Yakında Eklenecek
              </button>
            </form>
          </CardContent>
        </Card>

        {/* SECURITY SETTINGS */}
        <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
          <CardHeader>
            <CardTitle>Güvenlik</CardTitle>
            <CardDescription className="text-slate-500">
              Admin giriş parolasını güncelleyin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Yeni Parola</label>
                <input disabled type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-sm text-slate-400 cursor-not-allowed" />
              </div>
              <button disabled type="button" className="bg-slate-200 text-slate-500 font-bold py-2 px-4 rounded-md cursor-not-allowed w-full">
                Yakında Eklenecek
              </button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
