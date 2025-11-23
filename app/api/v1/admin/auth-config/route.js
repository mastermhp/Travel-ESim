import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { getAuthConfig, updateAuthConfig } from "@/lib/models/auth-config"

// GET auth config
export async function GET(request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const config = await getAuthConfig()

    return NextResponse.json({
      success: true,
      config: {
        enableEmailPassword: config.enableEmailPassword,
        enablePhoneOtp: config.enablePhoneOtp,
        enableSocialGoogle: config.enableSocialGoogle,
        enableSocialApple: config.enableSocialApple,
        enableSocialFacebook: config.enableSocialFacebook,
        requireMFA: config.requireMFA,
        allowedMfaMethods: config.allowedMfaMethods,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching auth config:", error)
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 })
  }
}

// PUT update auth config
export async function PUT(request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()

    // Validate allowed fields
    const allowedFields = [
      "enableEmailPassword",
      "enablePhoneOtp",
      "enableSocialGoogle",
      "enableSocialApple",
      "enableSocialFacebook",
      "requireMFA",
      "allowedMfaMethods",
    ]

    const updates = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    await updateAuthConfig(updates)

    return NextResponse.json({
      success: true,
      message: "Authentication settings updated successfully",
    })
  } catch (error) {
    console.error("[v0] Error updating auth config:", error)
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
  }
}
