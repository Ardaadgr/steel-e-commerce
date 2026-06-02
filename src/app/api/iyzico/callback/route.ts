import { NextResponse } from "next/server";
import { iyzipay } from "@/lib/iyzico";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get("token") as string;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (!token) {
      return NextResponse.redirect(`${appUrl}/checkout?error=no_token`);
    }

    return new Promise((resolve) => {
      iyzipay.checkoutForm.retrieve({
        locale: "tr",
        conversationId: "123456789",
        token: token
      }, (err: any, result: any) => {
        if (err || result.status !== "success" || result.paymentStatus !== "SUCCESS") {
          resolve(NextResponse.redirect(`${appUrl}/checkout?status=failed`));
        } else {
          // TODO: Update Prisma Order status to 'PROCESSING' here
          resolve(NextResponse.redirect(`${appUrl}/checkout?status=success`));
        }
      });
    });

  } catch (error) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${appUrl}/checkout?status=error`);
  }
}
