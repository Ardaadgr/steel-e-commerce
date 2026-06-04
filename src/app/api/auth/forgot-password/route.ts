import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "E-posta adresi gereklidir" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // Return success even if user not found for security (prevent email enumeration)
      return NextResponse.json({ success: true })
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry }
    })

    // Create reset URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    // Send email via Resend
    await resend.emails.send({
      from: 'Steel Sports <onboarding@resend.dev>', // Update when domain verified
      to: email,
      subject: 'Şifre Sıfırlama İsteği',
      html: `
        <div style="font-family: Arial, sans-serif; max-w-lg mx-auto p-6 bg-white rounded-xl border border-gray-200">
          <h2 style="color: #1e293b;">Şifrenizi Sıfırlayın</h2>
          <p style="color: #64748b; font-size: 16px;">
            Hesabınızın şifresini sıfırlamak için bir talep aldık. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 16px; margin-bottom: 16px;">
            Şifremi Sıfırla
          </a>
          <p style="color: #64748b; font-size: 14px;">
            Eğer bu isteği siz yapmadıysanız, bu e-postayı güvenle silebilirsiniz. Şifreniz siz değiştirene kadar aynı kalacaktır. Bu bağlantının geçerlilik süresi 1 saattir.
          </p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Şifre sıfırlama işlemi sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
}
