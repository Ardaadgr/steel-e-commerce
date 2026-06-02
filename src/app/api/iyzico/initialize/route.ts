import { NextResponse } from "next/server";
import { iyzipay } from "@/lib/iyzico";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyer, price, billingAddress, invoiceDetails } = body;

    // 1. Create the Pending Order in the Database with all invoice details
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
      }
    });

    const requestData = {
      locale: "tr",
      conversationId: order.id, // We use the database Order ID to track it
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
