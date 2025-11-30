import { Resend } from "resend"

// Initialize Resend client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Fallback to nodemailer if Resend is not configured
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

async function sendEmail({ to, subject, html, from }) {
  const fromEmail = from || process.env.RESEND_FROM_EMAIL || process.env.SMTP_USER
  const fromName = from ? from : `TraveleSIM <${fromEmail}>`

  // Try Resend first (if configured)
  if (resend && process.env.RESEND_API_KEY) {
    try {
      const { data, error } = await resend.emails.send({
        from: fromName,
        to: [to],
        subject,
        html,
      })

      if (error) {
        console.error("[Resend] Error:", error)
        throw error
      }

      console.log("[Resend] Email sent successfully:", data?.id || "unknown")
      return { success: true, provider: "resend", id: data?.id }
    } catch (error) {
      console.error("[Resend] Failed, trying SMTP fallback:", error.message)
      // Fall through to nodemailer
    }
  }

  // Fallback to nodemailer (Gmail SMTP)
  try {
    await transporter.sendMail({
      from: fromName,
      to,
      subject,
      html,
    })

    console.log("[SMTP] Email sent successfully to:", to)
    return { success: true, provider: "smtp" }
  } catch (error) {
    console.error("[SMTP] Error:", error)
    return { success: false, error: error.message }
  }
}

export async function sendOrderConfirmationEmail(order, qrUrl, activationCode) {
  try {
    const customerEmail = order.metadata?.customerEmail || order.userEmail || order.email
    const customerName = order.metadata?.customerName || order.customerName || "Customer"

    if (!customerEmail) {
      console.error("[Email] No customer email found in order:", order.orderId)
      return { success: false, error: "No customer email found" }
    }

    const planDetails = order.metadata?.plan || {}
    const country = planDetails.country || "your destination"
    const dataGB = planDetails.dataGB || planDetails.data || "N/A"
    const validityDays = planDetails.validityDays || planDetails.validity || "N/A"

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Your eSIM is Ready!</h2>
        <p>Hi ${customerName},</p>
        <p>Thank you for your purchase. Your eSIM has been successfully provisioned and is ready to use.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Plan:</strong> ${country} ${dataGB}GB ${validityDays} Days</p>
          <p><strong>Amount:</strong> ${order.currency} ${order.amount}</p>
          ${activationCode ? `<p><strong>Activation Code:</strong> <code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px;">${activationCode}</code></p>` : ""}
          ${order.iccid ? `<p><strong>ICCID:</strong> ${order.iccid}</p>` : ""}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <img src="${qrUrl}" alt="eSIM QR Code" style="max-width: 300px; border: 2px solid #e5e7eb; border-radius: 8px;"/>
          <p style="color: #6b7280; font-size: 14px;">Scan this QR code to activate your eSIM</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0;">Installation Instructions:</h4>
          <ol style="line-height: 1.8;">
            <li>Go to Settings → Cellular/Mobile Data → Add eSIM</li>
            <li>Scan the QR code above with your device camera</li>
            <li>Follow the on-screen instructions to complete setup</li>
            <li>Enable Data Roaming for your new eSIM plan</li>
            <li>Turn on your eSIM when you arrive at your destination</li>
          </ol>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #1e40af;">Important Tips:</h4>
          <ul style="line-height: 1.8;">
            <li>Install the eSIM before traveling (WiFi required)</li>
            <li>Keep your primary SIM active for calls/texts</li>
            <li>Data Roaming must be ON for the eSIM</li>
            <li>Check APN settings if data doesn't work immediately</li>
          </ul>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          Need help? Contact our support team at support@travelesim.com<br/>
          Order Reference: ${order.orderId}
        </p>
      </div>
    `

    const result = await sendEmail({
      to: customerEmail,
      subject: `Your ${country} eSIM is Ready - Activation Instructions`,
      html: emailHtml,
      from: `TraveleSIM <${process.env.RESEND_FROM_EMAIL || process.env.SMTP_USER}>`,
    })

    console.log(`[Email] Order confirmation sent to ${customerEmail} via ${result.provider}`)
    return result
  } catch (error) {
    console.error("[Email] Error sending confirmation:", error)
    return { success: false, error: error.message }
  }
}

export async function sendAgentApprovalEmail(agentEmail, agentName, tempPassword, agentId) {
  try {
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://esimconnec.vercel.app"}/agent/login`

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Congratulations! Your Agent Application is Approved</h2>
        <p>Hi ${agentName},</p>
        <p>Great news! Your agent application has been approved. You can now start selling eSIMs and earning commissions.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Login Credentials</h3>
          <p><strong>Email:</strong> ${agentEmail}</p>
          <p><strong>Temporary Password:</strong> <code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-size: 16px; font-weight: bold; color: #dc2626;">${tempPassword}</code></p>
          <p><strong>Agent ID:</strong> ${agentId}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #d97706;">⚠️ Important: Change Your Password</h4>
          <p>For security reasons, please change your password after your first login:</p>
          <ol style="line-height: 1.8;">
            <li>Login to the agent portal using the button below</li>
            <li>Use the credentials above</li>
            <li>Go to Settings and update your password immediately</li>
          </ol>
        </div>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${loginUrl}" 
             style="display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Login to Agent Portal
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          Need help? Contact our support team at support@travelesim.com
        </p>
      </div>
    `

    const result = await sendEmail({
      to: agentEmail,
      subject: "🎉 Welcome to TraveleSIM Agent Program - Your Account is Ready",
      html: emailHtml,
      from: `TraveleSIM Agent Team <${process.env.RESEND_FROM_EMAIL || process.env.SMTP_USER}>`,
    })

    console.log(`[Email] Agent approval sent to ${agentEmail} via ${result.provider}`)
    return result
  } catch (error) {
    console.error("[Email] Error sending agent approval:", error)
    return { success: false, error: error.message }
  }
}

export async function sendAdminAlert(subject, message) {
  try {
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL || "admin@travelesim.com",
      subject: `[ALERT] ${subject}`,
      html: `<div style="font-family: monospace; padding: 20px; background: #f3f4f6;"><pre>${message}</pre></div>`,
      from: `TraveleSIM Alerts <${process.env.RESEND_FROM_EMAIL || process.env.SMTP_USER}>`,
    })

    console.log(`[Admin Alert] Sent: ${subject} via ${result.provider}`)
    return result
  } catch (error) {
    console.error("[Admin Alert] Error:", error)
    return { success: false, error: error.message }
  }
}

// Legacy SMS function (requires Twilio setup)
export async function sendOrderConfirmationSMS(phoneNumber, orderId, activationCode) {
  try {
    // Only try to send SMS if Twilio is configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log("[SMS] Twilio not configured, skipping SMS")
      return { success: false, error: "SMS not configured" }
    }

    const { sendSMS } = await import("./twilio.js")
    const message = `Your eSIM is ready! Order: ${orderId}. Activation code: ${activationCode}. Check your email for the QR code.`
    await sendSMS(phoneNumber, message)
    console.log("[SMS] Order confirmation sent to:", phoneNumber)
    return { success: true }
  } catch (error) {
    console.error("[SMS] Error sending confirmation:", error)
    return { success: false, error: error.message }
  }
}
