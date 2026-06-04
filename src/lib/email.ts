import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import React from 'react';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendInvoiceEmail(order: any) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email will not be sent.");
    return { success: false, error: "No API Key" };
  }

  const isCorporate = order.invoiceType === "CORPORATE";
  const customerName = isCorporate ? order.companyName : order.customerName;

  try {
    const data = await resend.emails.send({
      from: 'STEEL Equipment <onboarding@resend.dev>', // Should be a verified domain in production
      to: [order.customerEmail],
      subject: 'STEEL - Siparişiniz Alındı',
      react: React.createElement(OrderConfirmationEmail, {
        customerName: customerName,
        orderId: order.id.slice(-8).toUpperCase(),
        totalAmount: order.totalAmount
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
