"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [invoiceType, setInvoiceType] = useState<"INDIVIDUAL" | "CORPORATE">("INDIVIDUAL")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    
    // Check if passwords match
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value
    
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      setLoading(false)
      return
    }

    try {
      const formData = {
        firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
        lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        password: password,
        address: (form.elements.namedItem("address") as HTMLInputElement).value,
        city: (form.elements.namedItem("city") as HTMLInputElement).value,
        district: (form.elements.namedItem("district") as HTMLInputElement).value,
        invoiceType,
        companyName: invoiceType === "CORPORATE" ? (form.elements.namedItem("companyName") as HTMLInputElement).value : undefined,
        taxOffice: invoiceType === "CORPORATE" ? (form.elements.namedItem("taxOffice") as HTMLInputElement).value : undefined,
        taxId: invoiceType === "CORPORATE" ? (form.elements.namedItem("taxId") as HTMLInputElement).value : undefined,
        tcId: invoiceType === "INDIVIDUAL" ? (form.elements.namedItem("tcId") as HTMLInputElement).value : undefined,
      }

      const res = await fetch("/api/auth/customer-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Kayıt işlemi başarısız")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/account")
        router.refresh()
      }, 2000)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center pt-32 pb-12 sm:px-6 lg:px-8">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-black text-slate-900 mb-4">Kayıt Başarılı!</h2>
        <p className="text-slate-500 text-lg">Hesabınız oluşturuldu. Hesabınıza yönlendiriliyorsunuz...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center pt-32 pb-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-bold text-slate-900 mb-8">
          Hesap Oluştur
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            
            {/* Kişisel Bilgiler */}
            <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Kişisel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Adınız</Label>
                    <Input id="firstName" name="firstName" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyadınız</Label>
                    <Input id="lastName" name="lastName" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input id="email" name="email" type="email" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon Numarası</Label>
                    <Input id="phone" name="phone" type="tel" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input id="password" name="password" type="password" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Adres Bilgileri */}
            <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Adres Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Açık Adres</Label>
                  <Input id="address" name="address" required className="bg-white border-slate-300 focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">İl</Label>
                    <Input id="city" name="city" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">İlçe</Label>
                    <Input id="district" name="district" required className="bg-white border-slate-300 focus:border-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fatura Bilgileri */}
            <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Fatura Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    className={`flex-1 ${invoiceType === "INDIVIDUAL" ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white' : 'bg-transparent border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    onClick={() => setInvoiceType("INDIVIDUAL")}
                  >
                    Bireysel Fatura
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className={`flex-1 ${invoiceType === "CORPORATE" ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white' : 'bg-transparent border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                    onClick={() => setInvoiceType("CORPORATE")}
                  >
                    Kurumsal Fatura
                  </Button>
                </div>

                {invoiceType === "CORPORATE" ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Firma / Şirket Adı</Label>
                      <Input id="companyName" name="companyName" required className="bg-white border-slate-300 focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taxOffice">Vergi Dairesi</Label>
                        <Input id="taxOffice" name="taxOffice" required className="bg-white border-slate-300 focus:border-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">Vergi Numarası</Label>
                        <Input id="taxId" name="taxId" required className="bg-white border-slate-300 focus:border-blue-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                    <Label htmlFor="tcId">T.C. Kimlik No (Zorunlu Değil)</Label>
                    <Input id="tcId" name="tcId" className="bg-white border-slate-300 focus:border-blue-500" placeholder="İsteğe bağlı" />
                  </div>
                )}
              </CardContent>
            </Card>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg font-medium text-center border border-red-100">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-bold shadow-md disabled:opacity-50"
            >
              {loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol ve Alışverişe Başla"}
            </Button>

            <div className="mt-6 flex items-center justify-center text-sm">
              <span className="text-slate-500">Zaten bir hesabınız var mı? </span>
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 ml-1">
                Giriş Yapın
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
