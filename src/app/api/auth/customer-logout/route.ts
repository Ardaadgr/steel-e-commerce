import { NextResponse } from "next/server"
import { clearCustomerSession } from "@/lib/auth"

export async function GET() {
  await clearCustomerSession()
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
}
