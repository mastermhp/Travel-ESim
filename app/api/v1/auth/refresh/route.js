// Refresh token endpoint
import { NextResponse } from "next/server"
import { findSessionByRefreshToken } from "@/lib/models/session"
import { findUserById } from "@/lib/models/user"
import { generateAccessToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json({ success: false, message: "Refresh token required" }, { status: 400 })
    }

    // Find session
    const session = await findSessionByRefreshToken(refreshToken)

    if (!session) {
      return NextResponse.json({ success: false, message: "Invalid or expired refresh token" }, { status: 401 })
    }

    // Get user
    const user = await findUserById(session.userId)

    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, message: "User not found or inactive" }, { status: 401 })
    }

    // Generate new access token
    const accessToken = generateAccessToken(user)

    return NextResponse.json({
      success: true,
      token: accessToken,
    })
  } catch (error) {
    console.error("[v0] Token refresh error:", error)

    return NextResponse.json({ success: false, message: "Token refresh failed" }, { status: 500 })
  }
}
