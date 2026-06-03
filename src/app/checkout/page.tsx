"use client";

import { useState, Suspense, useEffect } from "react";
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const productName = searchParams.get("name") || "STEEL İzometrik Sistem";
  const productPrice = searchParams.get("price") ? parseFloat(searchParams.get("price") as string) : 25000;
  const productImage = searchParams.get("image") || "";

  const [loading, setLoading] = useState(false);
  const [iyzicoHtml, setIyzicoHtml] = useState<string | null>(null);
  const [differentBilling, setDifferentBilling] = useState(false);
  const [invoiceType, setInvoiceType] = useState<"INDIVIDUAL" | "CORPORATE">("INDIVIDUAL");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const form = e.target as HTMLFormElement;
      
      const shippingAddress = {
        address: (form.elements.namedItem("address") as HTMLInputElement).value,
        city: (form.elements.namedItem("city") as HTMLInputElement).value,
        district: (form.elements.namedItem("district") as HTMLInputElement).value,
      };

      const billingAddress = differentBilling ? {
        address: (form.elements.namedItem("billingAddress") as HTMLInputElement).value,
        city: (form.elements.namedItem("billingCity") as HTMLInputElement).value,
        district: (form.elements.namedItem("billingDistrict") as HTMLInputElement).value,
      } : shippingAddress;

      const invoiceDetails = invoiceType === "CORPORATE" ? {
        type: "CORPORATE",
        companyName: (form.elements.namedItem("companyName") as HTMLInputElement).value,
        taxOffice: (form.elements.namedItem("taxOffice") as HTMLInputElement).value,
        taxId: (form.elements.namedItem("taxId") as HTMLInputElement).value,
      } : {
        type: "INDIVIDUAL",
        tcId: (form.elements.namedItem("tcId") as HTMLInputElement)?.value || "11111111111",
      };

      const response = await fetch("/api/iyzico/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: productPrice,
          buyer: {
            firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
            lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
            ...shippingAddress
          },
          billingAddress,
          invoiceDetails
        })
      });

      const data = await response.json();
      
      if (data.status === "success" && data.checkoutFormContent) {
        setIyzicoHtml(data.checkoutFormContent);
        setTimeout(() => {
          const script = document.createElement("script");
          script.innerHTML = data.checkoutFormContent.replace(/<script.*?>(.*?)<\/script>/, "$1").match(/<script.*?>(.*?)<\/script>/)?.[1] || data.checkoutFormContent.split('<script type="text/javascript">')[1]?.split('</script>')[0] || '';
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

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-black text-slate-900 uppercase mb-4">Siparişiniz Alındı!</h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
          Ödemeniz başarıyla gerçekleşti. Sipariş detaylarınız e-posta adresinize gönderildi.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  if (status === "failed" || status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <XCircle className="w-24 h-24 text-red-500 mb-6" />
        <h1 className="text-4xl font-black text-slate-900 uppercase mb-4">Ödeme Başarısız</h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
          Kartınızdan çekim yapılamadı veya işlem bankanız tarafından reddedildi.
        </p>
        <Link href="/checkout">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold">Tekrar Dene</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">Güvenli Ödeme</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ad</Label>
                  <Input id="firstName" name="firstName" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyad</Label>
                  <Input id="lastName" name="lastName" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Posta</Label>
                <Input id="email" name="email" type="email" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" type="tel" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Teslimat Adresi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Açık Adres</Label>
                <Input id="address" name="address" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">İl</Label>
                  <Input id="city" name="city" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">İlçe</Label>
                  <Input id="district" name="district" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="differentBilling" 
                  checked={differentBilling} 
                  onCheckedChange={(checked) => setDifferentBilling(checked as boolean)} 
                  className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="differentBilling" className="text-md font-medium leading-none cursor-pointer">
                  Fatura adresim teslimat adresimden farklı
                </Label>
              </div>
            </CardHeader>
            {differentBilling && (
              <CardContent className="space-y-4 pt-0 border-t border-slate-200 mt-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Fatura Açık Adresi</Label>
                  <Input id="billingAddress" name="billingAddress" required={differentBilling} className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingCity">Fatura İl</Label>
                    <Input id="billingCity" name="billingCity" required={differentBilling} className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingDistrict">Fatura İlçe</Label>
                    <Input id="billingDistrict" name="billingDistrict" required={differentBilling} className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                  </div>
                </div>
              </CardContent>
            )}
            
            {/* Invoice Details Section */}
            <CardContent className="space-y-4 pt-0 border-t border-slate-200 mt-4 pt-4">
              <div className="flex space-x-4 mb-4">
                <Button 
                  type="button"
                  variant="outline" 
                  className={`flex-1 ${invoiceType === "INDIVIDUAL" ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white' : 'bg-transparent border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setInvoiceType("INDIVIDUAL")}
                >Bireysel Fatura</Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className={`flex-1 ${invoiceType === "CORPORATE" ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white' : 'bg-transparent border-slate-300 text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                  onClick={() => setInvoiceType("CORPORATE")}
                >Kurumsal Fatura</Button>
              </div>

              {invoiceType === "CORPORATE" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Firma / Şirket Adı</Label>
                    <Input id="companyName" name="companyName" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxOffice">Vergi Dairesi</Label>
                      <Input id="taxOffice" name="taxOffice" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Vergi Numarası</Label>
                      <Input id="taxId" name="taxId" required className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="tcId">T.C. Kimlik No (Zorunlu Değil)</Label>
                  <Input id="tcId" name="tcId" className="bg-white border-slate-300 focus:border-blue-500 shadow-sm" placeholder="11111111111" />
                </div>
              )}
            </CardContent>
          </Card>

          {!iyzicoHtml ? (
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-bold shadow-md"
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
        <Card className="bg-white border-slate-200 text-slate-900 sticky top-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sipariş Özeti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                {productImage ? (
                  <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-slate-400 text-xs font-bold uppercase">Görsel</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{productName}</h3>
                <p className="text-sm text-slate-500">Standart Teslimat</p>
              </div>
              <div className="font-bold text-lg">₺{productPrice.toLocaleString("tr-TR")}</div>
            </div>
            
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <div className="flex justify-between text-slate-500">
                <span>Ara Toplam</span>
                <span>₺{productPrice.toLocaleString("tr-TR")}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Vergi (KDV %20)</span>
                <span>₺{(productPrice * 0.2).toLocaleString("tr-TR")}</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-6 border-t border-slate-200">
              <div>
                <p className="text-sm text-slate-500">Genel Toplam</p>
                <p className="text-xs text-slate-400">Vergiler Dahil</p>
              </div>
              <span className="text-3xl font-black text-slate-900">₺{(productPrice + (productPrice * 0.2)).toLocaleString("tr-TR")}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 bg-slate-50 rounded-b-xl border-t border-slate-200 mt-6 py-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 w-full">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              256-bit SSL Güvenli Ödeme
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 w-full">
              <CreditCard className="w-5 h-5 text-slate-400" />
              Kredi Kartlarına 12 Aya Varan Taksit
            </div>
          </CardFooter>
        </Card>
      </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Link>
        <Suspense fallback={<div className="text-slate-500">Yükleniyor...</div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}
