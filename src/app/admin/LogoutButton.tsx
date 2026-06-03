"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">Çıkış Yap</span>
    </button>
  )
}
