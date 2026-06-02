import { NextResponse } from "next/server";
import { iyzipay } from "@/lib/iyzico";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get("token") as string;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (!token) {
      return NextResponse.redirect(`${appUrl}/checkout?error=no_token`);
    }

    return new Promise((resolve) => {
      // The token itself isn't enough, we must retrieve the payment result from Iyzico
      iyzipay.checkoutForm.retrieve({
        locale: "tr",
        token: token
      }, async (err: any, result: any) => {
        if (err || result.status !== "success" || result.paymentStatus !== "SUCCESS") {
          // Payment Failed
          if (result && result.conversationId) {
             await prisma.order.update({
               where: { id: result.conversationId },
               data: { status: "CANCELLED", iyzicoId: result.paymentId || null }
             }).catch(() => {}); // ignore db errors here
          }
          resolve(NextResponse.redirect(`${appUrl}/checkout?status=failed`));
        } else {
          // Payment Success! 
          // result.conversationId is our Prisma Order ID that we sent during initialize
          if (result.conversationId) {
            await prisma.order.update({
              where: { id: result.conversationId },
              data: { status: "PROCESSING", iyzicoId: result.paymentId }
            });
          }
          resolve(NextResponse.redirect(`${appUrl}/checkout?status=success`));
        }
      });
    });

  } catch (error) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${appUrl}/checkout?status=error`);
  }
}
