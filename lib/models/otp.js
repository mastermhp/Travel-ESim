// OTP management
import { getCollection } from "../db"
import crypto from "crypto"

export async function createOTP(phone, type = "login") {
  const otps = await getCollection("otps")

  // Generate 6-digit OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const requestId = crypto.randomBytes(16).toString("hex")

  const otp = {
    phone,
    code,
    requestId,
    type,
    attempts: 0,
    verified: false,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  }

  await otps.insertOne(otp)

  // In production, send SMS here via Twilio, AWS SNS, etc.
  console.log(`[v0] OTP for ${phone}: ${code} (Request ID: ${requestId})`)

  return { requestId, expiresAt: otp.expiresAt }
}

export async function verifyOTP(requestId, code) {
  const otps = await getCollection("otps")

  const otp = await otps.findOne({
    requestId,
    expiresAt: { $gt: new Date() },
    verified: false,
  })

  if (!otp) {
    return { success: false, message: "OTP expired or invalid" }
  }

  // Increment attempts
  await otps.updateOne({ _id: otp._id }, { $inc: { attempts: 1 } })

  if (otp.attempts >= 3) {
    return { success: false, message: "Too many attempts" }
  }

  if (otp.code !== code) {
    return { success: false, message: "Invalid OTP code" }
  }

  // Mark as verified
  await otps.updateOne({ _id: otp._id }, { $set: { verified: true } })

  return { success: true, phone: otp.phone }
}
