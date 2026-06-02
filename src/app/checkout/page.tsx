"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [iyzicoHtml, setIyzicoHtml] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/iyzico/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: 25000,
          buyer: {
            firstName: (document.getElementById("firstName") as HTMLInputElement).value,
            lastName: (document.getElementById("lastName") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            phone: (document.getElementById("phone") as HTMLInputElement).value,
            address: (document.getElementById("address") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
          }
        })
      });

      const data = await response.json();
      
      if (data.status === "success" && data.checkoutFormContent) {
        setIyzicoHtml(data.checkoutFormContent);
        setTimeout(() => {
          const script = document.createElement("script");
          script.innerHTML = data.checkoutFormContent.replace(/<script.*?>(.*?)<\/script>/s, "$1").match(/<script.*?>(.*?)<\/script>/s)?.[1] || data.checkoutFormContent.split('<script type="text/javascript">')[1]?.split('</script>')[0] || '';
          if(script.innerHTML) document.body.appendChild(script);
        }, 100);
      } else {
        alert("Ödeme başlatılamadı: " + (data.errorMessage || "Bilinmeyen Hata"));
      }
    } catch (err) {
      alert("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tight">Güvenli Ödeme</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">İletişim Bilgileri</CardTitle>
                  <CardDescription className="text-gray-400">Sipariş bilgilendirmeleri için kullanılacaktır.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input id="firstName" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input id="lastName" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Posta</Label>
                    <Input id="email" type="email" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Teslimat Adresi</CardTitle>
                  <CardDescription className="text-gray-400">Ürünün teslim edileceği tam adresi girin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Açık Adres</Label>
                    <Input id="address" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">İl</Label>
                      <Input id="city" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">İlçe</Label>
                      <Input id="district" required className="bg-zinc-950 border-zinc-800 focus:border-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {!iyzicoHtml ? (
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-bold"
                  disabled={loading}
                >
                  {loading ? "İyzico'ya Bağlanılıyor..." : "Ödemeye Geç"}
                </Button>
              ) : (
                <div className="bg-white rounded-xl p-2 w-full min-h-[400px]">
                  <div dangerouslySetInnerHTML={{ __html: iyzicoHtml }} />
                  <div id="iyzipay-checkout-form" className="responsive"></div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card className="bg-zinc-900 border-zinc-800 text-white sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-700 text-xs font-bold uppercase">Görsel</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">STEEL İzometrik Sistem</h3>
                    <p className="text-sm text-gray-400">Profesyonel Paket</p>
                  </div>
                  <div className="font-bold text-lg">₺25.000</div>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-zinc-800">
                  <div className="flex justify-between text-gray-400">
                    <span>Ara Toplam</span>
                    <span>₺25.000</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Kargo</span>
                    <span className="text-green-500">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Vergi (KDV %20)</span>
                    <span>₺5.000</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-zinc-800">
                  <div>
                    <p className="text-sm text-gray-400">Genel Toplam</p>
                    <p className="text-xs text-gray-500">Vergiler Dahil</p>
                  </div>
                  <span className="text-3xl font-black text-white">₺30.000</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4 bg-zinc-950/50 rounded-b-xl border-t border-zinc-800 mt-6 py-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 w-full">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  256-bit SSL Güvenli Ödeme
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 w-full">
                  <CreditCard className="w-5 h-5 text-gray-300" />
                  Kredi Kartlarına 12 Aya Varan Taksit
                </div>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
