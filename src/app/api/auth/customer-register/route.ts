import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { setCustomerSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { 
      email, password, firstName, lastName, phone, 
      address, city, district, invoiceType, 
      companyName, taxOffice, taxId, tcId 
    } = data

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Ad, soyad, e-posta ve şifre zorunludur" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi ile zaten kayıtlı bir hesap var" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const fullName = `${firstName} ${lastName}`.trim()

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
        role: "CUSTOMER",
        phone,
        address,
        city,
        district,
        invoiceType: invoiceType || "INDIVIDUAL",
        companyName,
        taxOffice,
        taxId,
        tcId
      }
    })

    // Set Customer Session automatically after successful registration
    await setCustomerSession({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ success: true, userId: user.id })

  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "Kayıt olurken bir hata oluştu" },
      { status: 500 }
    )
  }
}
