import { NextResponse } from "next/server";
import { iyzipay } from "@/lib/iyzico";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyer, price, conversationId } = body;

    const requestData = {
      locale: "tr",
      conversationId: conversationId || "123456789",
      price: price.toString(),
      paidPrice: price.toString(),
      currency: "TRY",
      basketId: "B67832",
      paymentGroup: "PRODUCT",
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/iyzico/callback`,
      enabledInstallments: [2, 3, 6, 9, 12],
      buyer: {
        id: "BY789",
        name: buyer.firstName || "Test",
        surname: buyer.lastName || "Kullanıcı",
        gsmNumber: buyer.phone || "+905350000000",
        email: buyer.email || "test@test.com",
        identityNumber: "74300864791",
        lastLoginDate: "2023-01-01 15:12:09",
        registrationDate: "2023-01-01 15:12:09",
        registrationAddress: buyer.address || "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        ip: "85.34.78.112",
        city: buyer.city || "Istanbul",
        country: "Turkey",
        zipCode: "34732"
      },
      shippingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city || "Istanbul",
        country: "Turkey",
        address: buyer.address || "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34732"
      },
      billingAddress: {
        contactName: `${buyer.firstName} ${buyer.lastName}`,
        city: buyer.city || "Istanbul",
        country: "Turkey",
        address: buyer.address || "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34732"
      },
      basketItems: [
        {
          id: "BI101",
          name: "STEEL İzometrik Sistem",
          category1: "Spor Ekipmanları",
          itemType: "PHYSICAL",
          price: price.toString()
        }
      ]
    };

    return new Promise((resolve) => {
      iyzipay.checkoutFormInitialize.create(requestData, (err: any, result: any) => {
        if (err) {
          resolve(NextResponse.json({ status: "error", error: err }, { status: 500 }));
        } else {
          resolve(NextResponse.json(result));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ status: "error", error: "Internal Server Error" }, { status: 500 });
  }
}
