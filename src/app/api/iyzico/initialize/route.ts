import { NextResponse } from "next/server";
import { iyzipay } from "@/lib/iyzico";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyer, price, billingAddress, invoiceDetails, cartItems } = body;

    // 1. Create the Pending Order in the Database with all invoice details and order items
    const order = await prisma.order.create({
      data: {
        customerEmail: buyer.email || "test@test.com",
        customerName: `${buyer.firstName} ${buyer.lastName}`,
        customerPhone: buyer.phone || "+905350000000",
        address: buyer.address || "Teslimat Adresi Girilmedi",
        city: buyer.city || "Istanbul",
        district: buyer.district || "",
        totalAmount: price,
        status: "PENDING",
        
        // Invoice Details
        invoiceType: invoiceDetails?.type || "INDIVIDUAL",
        tcId: invoiceDetails?.tcId || null,
        companyName: invoiceDetails?.companyName || null,
        taxOffice: invoiceDetails?.taxOffice || null,
        taxId: invoiceDetails?.taxId || null,
        
        // Billing Address
        billingAddress: billingAddress?.address || buyer.address || "Fatura Adresi Girilmedi",
        billingCity: billingAddress?.city || buyer.city || "Istanbul",
        billingDistrict: billingAddress?.district || "",

        // Order Items
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.unitPrice
          }))
        }
      }
    });

    const requestData = {
      locale: "tr",
      conversationId: order.id, 
      price: price.toString(),
      paidPrice: price.toString(),
      currency: "TRY",
      basketId: order.id,
      paymentGroup: "PRODUCT",
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/iyzico/callback`,
      enabledInstallments: [2, 3, 6, 9, 12],
      buyer: {
        id: "BY789",
        name: buyer.firstName || "Test",
        surname: buyer.lastName || "Kullanıcı",
        gsmNumber: buyer.phone || "+905350000000",
        email: buyer.email || "test@test.com",
        identityNumber: invoiceDetails?.tcId || "74300864791",
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
        contactName: invoiceDetails?.companyName || `${buyer.firstName} ${buyer.lastName}`,
        city: billingAddress?.city || buyer.city || "Istanbul",
        country: "Turkey",
        address: billingAddress?.address || buyer.address || "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34732"
      },
      basketItems: cartItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        category1: item.category1 || "Spor Ekipmanları",
        itemType: "PHYSICAL",
        price: item.price.toString()
      }))
    };

    return new Promise<Response>((resolve) => {
      iyzipay.checkoutFormInitialize.create(requestData as any, (err: any, result: any) => {
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
