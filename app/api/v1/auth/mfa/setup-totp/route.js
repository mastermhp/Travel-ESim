// TOTP MFA setup endpoint
import { NextResponse } from "next/server"
import { authenticator } from "otplib/authenticator"
import { getCurrentUser } from "@/lib/auth"
import { findUserById, updateUser } from "@/lib/models/user"
import QRCode from "qrcode"

export async function POST(request) {
  try {
    // Verify user is authenticated
    const currentUser = await getCurrentUser(request)

    if (!currentUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Get user details
    const user = await findUserById(currentUser.userId)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Generate TOTP secret
    const secret = authenticator.generateSecret()

    // Generate OTP auth URL
    const otpauthUrl = authenticator.keyuri(user.email, "Travel eSIM", secret)

    // Generate QR code
    const qrCode = await QRCode.toDataURL(otpauthUrl)

    // Store secret temporarily (will be confirmed on verification)
    await updateUser(user._id.toString(), {
      "mfa.totpSecret": secret,
      "mfa.totpConfirmed": false,
    })

    return NextResponse.json({
      success: true,
      secret,
      otpauthUrl,
      qrCode,
    })
  } catch (error) {
    console.error("[v0] TOTP setup error:", error)

    return NextResponse.json({ success: false, message: "TOTP setup failed" }, { status: 500 })
  }
}
