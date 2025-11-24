import nodemailer from "nodemailer"
import { sendSMS } from "./twilio.js"

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendOrderConfirmationEmail(order, qrUrl, activationCode) {
  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Your eSIM is Ready!</h2>
        <p>Thank you for your purchase. Your eSIM has been successfully provisioned.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Amount:</strong> ${order.currency} ${order.amount}</p>
          <p><strong>Activation Code:</strong> ${activationCode}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <img src="${qrUrl}" alt="eSIM QR Code" style="max-width: 300px; border: 2px solid #e5e7eb; border-radius: 8px;"/>
          <p style="color: #6b7280; font-size: 14px;">Scan this QR code to activate your eSIM</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0;">Installation Instructions:</h4>
          <ol style="line-height: 1.8;">
            <li>Go to Settings → Cellular/Mobile Data → Add eSIM</li>
            <li>Scan the QR code above</li>
            <li>Follow the on-screen instructions</li>
            <li>Enable Data Roaming for your new plan</li>
          </ol>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          Need help? Contact our support team at support@travelesim.com
        </p>
      </div>
    `

    await transporter.sendMail({
      from: `"TraveleSIM" <${process.env.SMTP_USER}>`,
      to: order.userEmail,
      subject: "Your eSIM is Ready - Activation Instructions",
      html: emailHtml,
    })

    console.log("[Email] Order confirmation sent to:", order.userEmail)
    return { success: true }
  } catch (error) {
    console.error("[Email] Error sending confirmation:", error)
    return { success: false, error: error.message }
  }
}

export async function sendOrderConfirmationSMS(phoneNumber, orderId, activationCode) {
  try {
    const message = `Your eSIM is ready! Order: ${orderId}. Activation code: ${activationCode}. Check your email for the QR code.`
    await sendSMS(phoneNumber, message)
    console.log("[SMS] Order confirmation sent to:", phoneNumber)
    return { success: true }
  } catch (error) {
    console.error("[SMS] Error sending confirmation:", error)
    return { success: false, error: error.message }
  }
}

export async function sendAdminAlert(subject, message) {
  try {
    await transporter.sendMail({
      from: `"TraveleSIM Alerts" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || "admin@travelesim.com",
      subject: `[ALERT] ${subject}`,
      text: message,
    })
    console.log("[Admin Alert] Sent:", subject)
  } catch (error) {
    console.error("[Admin Alert] Error:", error)
  }
}
