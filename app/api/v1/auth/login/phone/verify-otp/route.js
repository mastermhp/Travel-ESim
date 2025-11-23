// Phone OTP verification endpoint
import { NextResponse } from "next/server"
import { verifyOTP } from "@/lib/models/otp"
import { findUserByPhone, createUser } from "@/lib/models/user"
import { createSession } from "@/lib/models/session"
import { generateAccessToken, logSecurityEvent } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { requestId, code } = body

    if (!requestId || !code) {
      return NextResponse.json({ success: false, message: "Request ID and code required" }, { status: 400 })
    }

    // Verify OTP
    const result = await verifyOTP(requestId, code)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }

    // Find or create user
    let user = await findUserByPhone(result.phone)

    if (!user) {
      // Auto-create user for phone login
      user = await createUser({
        name: result.phone,
        email: `${result.phone.replace("+", "")}@phone.temp`,
        phone: result.phone,
        password: Math.random().toString(36),
        username: `user_${result.phone.replace("+", "")}`,
        role: "customer",
      })
    }

    // Check if MFA is required
    if (user.mfa.enabled) {
      return NextResponse.json({
        success: true,
        mfaRequired: true,
        mfaMethods: user.mfa.methods,
        tempToken: generateAccessToken({ ...user, temp: true }),
      })
    }

    // Create session
    const deviceInfo = request.headers.get("user-agent") || "Unknown"
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown"

    const refreshToken = await createSession(user._id.toString(), deviceInfo, ip)

    // Generate access token
    const accessToken = generateAccessToken(user)

    // Log successful login
    logSecurityEvent(user._id.toString(), "SUCCESSFUL_LOGIN", { phone: result.phone, method: "phone" })

    return NextResponse.json({
      success: true,
      token: accessToken,
      refreshToken,
      mfaRequired: false,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        referralCode: user.referralCode,
      },
    })
  } catch (error) {
    console.error("[v0] OTP verification error:", error)

    return NextResponse.json({ success: false, message: "OTP verification failed" }, { status: 500 })
  }
}
