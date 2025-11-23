// Logout endpoint
import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/models/session"
import { getCurrentUser, logSecurityEvent } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    // Get current user for logging
    const currentUser = await getCurrentUser(request)

    if (refreshToken) {
      await deleteSession(refreshToken)
    }

    if (currentUser) {
      logSecurityEvent(currentUser.userId, "USER_LOGOUT", {})
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("[v0] Logout error:", error)

    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
