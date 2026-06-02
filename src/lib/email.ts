import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendInvoiceEmail(order: any) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email will not be sent.");
    return { success: false, error: "No API Key" };
  }

  const isCorporate = order.invoiceType === "CORPORATE";
  const customerName = isCorporate ? order.companyName : order.customerName;
  const taxInfo = isCorporate 
    ? `VD: ${order.taxOffice} - VN: ${order.taxId}`
    : `TC: ${order.tcId || "Belirtilmedi"}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h1 style="color: #E53E3E; text-align: center; font-weight: 900; letter-spacing: -1px;">STEEL.</h1>
      <h2 style="text-align: center; color: #333;">Sipariş Makbuzu</h2>
      <p style="color: #666; text-align: center;">Bizi tercih ettiğiniz için teşekkür ederiz.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 30px;">
        <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Sipariş Özeti</h3>
        <p><strong>Sipariş No:</strong> #${order.id.slice(-8).toUpperCase()}</p>
        <p><strong>Tarih:</strong> ${new Date().toLocaleDateString("tr-TR")}</p>
        <p><strong>Tutar:</strong> ₺${order.totalAmount.toLocaleString("tr-TR")}</p>
        <p><strong>Durum:</strong> Ödendi</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <h3 style="margin-top: 0; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Fatura Bilgileri</h3>
        <p><strong>Firma/Müşteri:</strong> ${customerName}</p>
        <p><strong>Vergi/TC Bilgisi:</strong> ${taxInfo}</p>
        <p><strong>Fatura Adresi:</strong> ${order.billingAddress}, ${order.billingCity}</p>
      </div>

      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
        <p>Bu makbuz bilgilendirme amaçlıdır. Resmi e-Faturanız muhasebe birimimiz tarafından e-posta adresinize ayrıca iletilecektir.</p>
        <p>STEEL Mekanik Spor Sistemleri | info@steelequipment.com</p>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'STEEL Equipment <onboarding@resend.dev>', // Should be a verified domain in production
      to: [order.customerEmail],
      subject: 'STEEL - Siparişiniz Alındı (Makbuz)',
      html: htmlContent,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
