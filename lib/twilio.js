import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const superSimFleetSid = process.env.TWILIO_SUPERSIM_FLEET_SID

let twilioClient = null

export function getTwilioClient() {
  if (!twilioClient && accountSid && authToken) {
    twilioClient = twilio(accountSid, authToken)
  }
  return twilioClient
}

export async function provisionTwilioSuperSIM(order) {
  try {
    const client = getTwilioClient()
    if (!client) {
      throw new Error("Twilio client not configured")
    }

    console.log("[Twilio] Provisioning Super SIM for order:", order.orderId)

    // Create Super SIM
    const sim = await client.supersim.v1.sims.create({
      fleet: superSimFleetSid,
      uniqueName: `esim_${order.orderId}`,
      iccid: `89${Math.random().toString().slice(2, 21)}`, // Twilio assigns this automatically
      registrationCode: `LPA:1$activation.twilio.com$${order.orderId}`,
    })

    console.log("[Twilio] Super SIM created:", sim.sid)

    // Generate QR code data
    const activationCode = sim.registrationCode || `LPA:1$activation.twilio.com$${sim.sid}`

    // You can generate QR code from activation code using qrcode library
    const QRCode = require("qrcode")
    const qrDataUrl = await QRCode.toDataURL(activationCode)

    const result = {
      success: true,
      iccid: sim.iccid,
      sid: sim.sid,
      activationCode: activationCode,
      qrCodeDataUrl: qrDataUrl,
      status: sim.status,
      fleet: sim.fleet,
    }

    console.log("[Twilio] Provisioning successful:", result)
    return result
  } catch (error) {
    console.error("[Twilio] Provisioning failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function sendSMS(to, body) {
  try {
    const client = getTwilioClient()
    if (!client) {
      throw new Error("Twilio client not configured")
    }

    const message = await client.messages.create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    })

    console.log("[Twilio SMS] Sent:", message.sid)
    return { success: true, messageSid: message.sid }
  } catch (error) {
    console.error("[Twilio SMS] Failed:", error)
    return { success: false, error: error.message }
  }
}

export async function sendOTP(phoneNumber, code) {
  const message = `Your verification code is: ${code}. Valid for 10 minutes.`
  return await sendSMS(phoneNumber, message)
}
