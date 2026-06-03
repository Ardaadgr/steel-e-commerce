"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For MVP, we mock the email sending process
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-4xl font-black text-slate-900 tracking-tighter mb-2">
          STEEL<span className="text-blue-600">.</span>
        </div>
        <h2 className="mt-2 text-center text-xl font-bold text-slate-700">
          Şifremi Unuttum
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Talep Alındı</h3>
              <p className="text-sm text-slate-500">
                Eğer sistemde <strong>{email}</strong> adresine ait bir admin hesabı varsa, şifre sıfırlama talimatları e-posta adresinize gönderilecektir. (Not: Test modunda e-posta gönderimi devre dışıdır).
              </p>
              <div className="pt-4">
                <Link href="/admin/login" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Giriş sayfasına dön
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <p className="text-sm text-slate-500 text-center mb-6">
                Hesabınıza ait e-posta adresinizi girin. Size şifre sıfırlama bağlantısını göndereceğiz.
              </p>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700"
                >
                  E-posta Adresi
                </label>
                <div className="mt-2 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 focus:bg-white transition-colors"
                    placeholder="admin@steelfitness.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Şifre Sıfırlama Linki Gönder
                </button>
              </div>

              <div className="text-center mt-4">
                <Link href="/admin/login" className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                  Giriş sayfasına dön
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
