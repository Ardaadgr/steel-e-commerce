import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr
} from "@react-email/components"
import * as React from "react"

interface OrderConfirmationEmailProps {
  customerName: string
  orderId: string
  totalAmount: number
}

export const OrderConfirmationEmail = ({
  customerName = "Değerli Müşterimiz",
  orderId = "12345",
  totalAmount = 0
}: OrderConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Siparişiniz başarıyla alındı - STEEL.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>STEEL<span style={{ color: "#2563eb" }}>.</span></Heading>
          
          <Section style={section}>
            <Heading style={h2}>Siparişiniz Alındı!</Heading>
            <Text style={text}>
              Merhaba {customerName},
            </Text>
            <Text style={text}>
              Siparişiniz başarıyla alındı ve üretime/hazırlık aşamasına geçildi. Bizimle antrenmanlarınızı yeni bir boyuta taşıyacağınız için çok heyecanlıyız!
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={textBold}>Sipariş Özeti</Text>
            <Text style={text}>
              Sipariş Numarası: <strong>#{orderId}</strong>
            </Text>
            <Text style={text}>
              Ödenen Tutar: <strong>₺{totalAmount.toLocaleString("tr-TR")}</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Sorularınız için info@steelequipment.com adresinden bize ulaşabilirsiniz.
          </Text>
          <Text style={footer}>
            STEEL Mekanik Spor Sistemleri
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "600px",
  border: "1px solid #e2e8f0"
}

const h1 = {
  color: "#0f172a",
  fontSize: "32px",
  fontWeight: "900",
  textAlign: "center" as const,
  margin: "0 0 40px",
  letterSpacing: "-1px"
}

const h2 = {
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
}

const text = {
  color: "#475569",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const textBold = {
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px",
}

const section = {
  margin: "0 0 32px",
}

const hr = {
  borderColor: "#e2e8f0",
  margin: "20px 0",
}

const footer = {
  color: "#94a3b8",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "0",
}

export default OrderConfirmationEmail
