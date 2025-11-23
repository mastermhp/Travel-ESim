import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth"
import { getCollection } from "@/lib/db"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    console.log("[v0] Admin login attempt for:", email)

    // Get admin user from database
    const users = await getCollection("users")
    const adminUser = await users.findOne({
      email: email,
      role: "admin",
    })

    console.log("[v0] Admin user found:", !!adminUser)

    if (!adminUser) {
      console.log("[v0] Admin not found in database")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.passwordHash)

    console.log("[v0] Password valid:", isValidPassword)

    if (!isValidPassword) {
      console.log("[v0] Invalid password")
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create admin token
    const token = createToken({
      userId: adminUser._id.toString(),
      email: adminUser.email,
      role: adminUser.role,
    })

    // Log admin login
    try {
      const logs = await getCollection("admin_logs")
      await logs.insertOne({
        action: "admin_login",
        adminId: adminUser._id,
        email: adminUser.email,
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
        timestamp: new Date(),
      })
    } catch (logError) {
      console.error("[v0] Failed to log admin login:", logError)
      // Continue even if logging fails
    }

    console.log("[v0] Admin login successful")

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: adminUser._id.toString(),
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return NextResponse.json({ error: "Login failed: " + error.message }, { status: 500 })
  }
}
