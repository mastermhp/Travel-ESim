import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { Agent } from "@/lib/models/agent"

export async function POST(request) {
  try {
    await connectDB()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 })
    }

    // Find agent
    const agent = await Agent.findById(decoded.id)
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    }

    console.log("[v0] ===== Password Verification Debug =====")
    console.log("[v0] Agent ID:", agent.agentId)
    console.log("[v0] Agent Email:", agent.email)
    console.log("[v0] Input password:", currentPassword)
    console.log("[v0] Input password length:", currentPassword.length)
    console.log("[v0] Input password type:", typeof currentPassword)
    console.log("[v0] Stored hash:", agent.password)
    console.log("[v0] Stored hash length:", agent.password.length)

    // Test if we can hash the input and it would produce the same result
    const testHash = await bcrypt.hash(currentPassword, 10)
    console.log("[v0] Test hash of input:", testHash)

    // Try comparing
    const bcryptResult = await bcrypt.compare(currentPassword, agent.password)
    console.log("[v0] bcrypt.compare result:", bcryptResult)

    // Also try comparing the test hash with input
    const testComparison = await bcrypt.compare(currentPassword, testHash)
    console.log("[v0] Test comparison (should be true):", testComparison)
    console.log("[v0] ===== End Debug =====")
    // </CHANGE>

    // Verify current password
    let isCurrentPasswordValid = false

    // Check if password is bcrypt hashed
    if (agent.password.startsWith("$2a$") || agent.password.startsWith("$2b$")) {
      isCurrentPasswordValid = await bcrypt.compare(currentPassword, agent.password)
    } else {
      // Plain text password comparison (for temporary passwords)
      isCurrentPasswordValid = currentPassword.trim() === agent.password.trim()
    }

    if (!isCurrentPasswordValid) {
      console.log("[v0] ❌ Password verification failed")
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
    }

    console.log("[v0] ✅ Password verification successful")

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password and clear requirePasswordChange flag
    await Agent.updateOne(
      { _id: agent._id },
      {
        $set: {
          password: hashedPassword,
          requirePasswordChange: false,
          lastPasswordChange: new Date(),
        },
      },
    )

    console.log("[v0] Password updated successfully for agent:", agent.agentId)

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("[Change Password] Error:", error)
    return NextResponse.json({ error: "Failed to change password", details: error.message }, { status: 500 })
  }
}
