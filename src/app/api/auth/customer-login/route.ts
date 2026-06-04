import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { setCustomerSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre zorunludur" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || user.role !== "CUSTOMER") {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı veya yetkisiz" },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Geçersiz şifre" },
        { status: 401 }
      )
    }

    // Set Customer Session
    await setCustomerSession({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu" },
      { status: 500 }
    )
  }
}
