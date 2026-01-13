// TOTP verification endpoint
import { NextResponse } from "next/server"
// import { authenticator } from "otplib/authenticator"
import { getCurrentUser } from "@/lib/auth"
import { findUserById, updateUser } from "@/lib/models/user"
import { authenticator } from "otplib/authenticator.js"

export async function POST(request) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ success: false, message: "Verification code required" }, { status: 400 })
    }

    // Verify user is authenticated
    const currentUser = await getCurrentUser(request)

    if (!currentUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get user details
    const user = await findUserById(currentUser.userId)

    if (!user || !user.mfa?.totpSecret) {
      return NextResponse.json({ success: false, message: "TOTP not set up" }, { status: 400 })
    }

    // Verify TOTP code
    const isValid = authenticator.verify({
      token: code,
      secret: user.mfa.totpSecret,
    })

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 })
    }

    // Enable MFA
    await updateUser(user._id.toString(), {
      "mfa.enabled": true,
      "mfa.totpConfirmed": true,
      "mfa.methods": ["totp"],
    })

    return NextResponse.json({
      success: true,
      message: "TOTP verified and enabled successfully",
    })
  } catch (error) {
    console.error("[v0] TOTP verification error:", error)

    return NextResponse.json({ success: false, message: "TOTP verification failed" }, { status: 500 })
  }
}
