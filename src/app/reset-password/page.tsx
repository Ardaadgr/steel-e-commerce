"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Lock, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Geçersiz Bağlantı</h2>
        <p className="text-slate-500 mb-6">Şifre sıfırlama bağlantınız eksik veya hatalı.</p>
        <Link href="/forgot-password">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Yeni Bağlantı İste</Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.")
      return
    }
    
    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Şifre sıfırlanamadı")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Şifreniz Güncellendi!</h2>
        <p className="text-slate-500 mb-6">Şifreniz başarıyla değiştirildi. Giriş sayfasına yönlendiriliyorsunuz...</p>
        <Link href="/login">
          <Button variant="outline" className="w-full flex items-center justify-center">
            Giriş Yap <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="password">Yeni Şifre</Label>
        <div className="relative">
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-11 border-slate-300 focus:border-blue-500 rounded-xl"
            placeholder="En az 6 karakter"
          />
          <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-2.5" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-11 border-slate-300 focus:border-blue-500 rounded-xl"
            placeholder="Şifrenizi tekrar girin"
          />
          <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-2.5" />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100 text-center">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-md font-bold rounded-xl"
      >
        {loading ? "Güncelleniyor..." : "Şifremi Güncelle"}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
          Yeni Şifre Belirleme
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Güvenliğiniz için lütfen yeni ve güçlü bir şifre belirleyin.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl border border-slate-200 sm:px-10">
          <Suspense fallback={<div className="text-center text-slate-500">Yükleniyor...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
