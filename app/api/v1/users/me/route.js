import { NextResponse } from "next/server"
import { findUserById, updateUser } from "@/lib/models/user"
import { verifyAccessToken } from "@/lib/auth"

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyAccessToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.name?.split(" ")[0] || user.name || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("[Users] Error fetching user:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = verifyAccessToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, phone } = body

    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const updates = {}
    if (firstName || lastName) {
      const first = firstName || user.name?.split(" ")[0] || ""
      const last = lastName || user.name?.split(" ").slice(1).join(" ") || ""
      updates.name = `${first} ${last}`.trim()
    }
    if (phone) updates.phone = phone

    await updateUser(decoded.userId, updates)

    // Get updated user
    const updatedUser = await findUserById(decoded.userId)

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        firstName: updatedUser.name?.split(" ")[0] || updatedUser.name || "",
        lastName: updatedUser.name?.split(" ").slice(1).join(" ") || "",
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    console.error("[Users] Error updating user:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
