// Phone OTP request endpoint
import { NextResponse } from "next/server"
import { createOTP } from "@/lib/models/otp"
import { checkRateLimit } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { phone } = body

    if (!phone) {
      return NextResponse.json({ success: false, message: "Phone number required" }, { status: 400 })
    }

    // Validate phone format (basic validation)
    if (!/^\+\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone format. Use +countrycode format" },
        { status: 400 },
      )
    }

    // Rate limiting
    if (!checkRateLimit(phone)) {
      return NextResponse.json(
        { success: false, message: "Too many OTP requests. Please try again later." },
        { status: 429 },
      )
    }

    // Create OTP
    const { requestId, expiresAt } = await createOTP(phone, "login")

    return NextResponse.json({
      success: true,
      requestId,
      expiresAt,
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.error("[v0] OTP request error:", error)

    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 })
  }
}
