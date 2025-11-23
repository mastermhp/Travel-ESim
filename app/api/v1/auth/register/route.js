// Registration API endpoint
import { NextResponse } from "next/server"
import { createUser } from "@/lib/models/user"
import { createSession } from "@/lib/models/session"
import { generateAccessToken, logSecurityEvent } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, password, username, language, referralCodeUsed, role } = body

    if (!name || !email || !phone || !password || !username) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Create user
    const user = await createUser({
      name,
      email,
      phone,
      password,
      username,
      language: language || "en",
      referralCodeUsed,
      role: role || "customer",
    })

    // Create session
    const deviceInfo = request.headers.get("user-agent") || "Unknown"
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown"

    const refreshToken = await createSession(user._id.toString(), deviceInfo, ip)

    // Generate access token
    const accessToken = generateAccessToken(user)

    // Log event
    logSecurityEvent(user._id.toString(), "USER_REGISTERED", { email, method: "email" })

    return NextResponse.json(
      {
        success: true,
        userId: user._id.toString(),
        token: accessToken,
        refreshToken,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          username: user.username,
          role: user.role,
          referralCode: user.referralCode,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Registration failed",
      },
      { status: 400 },
    )
  }
}
