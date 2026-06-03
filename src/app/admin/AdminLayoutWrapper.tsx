"use client"

import { usePathname } from "next/navigation"

export default function AdminLayoutWrapper({ 
  children, 
  sidebar, 
  header 
}: { 
  children: React.ReactNode
  sidebar: React.ReactNode
  header: React.ReactNode 
}) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password"

  if (isAuthPage) {
    return <div className="min-h-screen bg-slate-50 w-full flex-1">{children}</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {sidebar}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {header}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
