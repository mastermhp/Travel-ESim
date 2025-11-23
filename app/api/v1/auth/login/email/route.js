// Email login API endpoint
import { NextResponse } from "next/server"
import { findUserByEmail, verifyPassword } from "@/lib/models/user"
import { createSession } from "@/lib/models/session"
import { generateAccessToken, checkRateLimit, logSecurityEvent } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 })
    }

    // Rate limiting
    if (!checkRateLimit(email)) {
      logSecurityEvent(null, "RATE_LIMIT_EXCEEDED", { email })
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please try again later." },
        { status: 429 },
      )
    }

    // Find user
    const user = await findUserByEmail(email)

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ success: false, message: "Account is disabled" }, { status: 403 })
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      logSecurityEvent(user._id.toString(), "FAILED_LOGIN", { email })
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Check if MFA is required
    if (user.mfa.enabled) {
      // Return MFA challenge
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
    logSecurityEvent(user._id.toString(), "SUCCESSFUL_LOGIN", { email, method: "email" })

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
    console.error("[v0] Login error:", error)

    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
